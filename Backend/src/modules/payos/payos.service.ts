import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PayOS = require('@payos/node');
import { OrderDetail } from 'src/modules/order-detail/order-detail.entity';
import { OrderDetailService } from 'src/modules/order-detail/order-detail.service'; // Đảm bảo inject service OrderDetailService để cập nhật đơn hàng
import { OrderStatus } from '../order-detail/enum';
import { retry } from 'rxjs';
import { Book } from '../book/entity/book.entity';
const axios = require('axios');

@Injectable()
export class PayosService {
    private payOS: PayOS;

    constructor(
        private configService: ConfigService,
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ) {
        this.payOS = new PayOS(
            this.configService.get<string>('PAYOS_CLIENT_ID'),
            this.configService.get<string>('PAYOS_API_KEY'),
            this.configService.get<string>('PAYOS_CHECKSUM_KEY'),
        );
    }

    async createPaymentLink(orderId: number, order: OrderDetail, paymentContent: string) {
        const YOUR_DOMAIN = this.configService.get<string>('YOUR_DOMAIN');

        if (!order.cartItem || order.cartItem.length === 0) {
            throw new Error('Order does not contain any books');
        }

        const paymentData = {
            orderCode: orderId,
            amount: parseFloat(order.totalPrice.toString()),  // Chuyển đổi thành số
            description: paymentContent,
            items: await Promise.all(order.cartItem.map(async (item) => {
                return {
                    name: `Book Title: ${item.bookId || 'Unknown'}`,
                    quantity: item.quantity,
                    price: parseFloat(item.sellingPrice.toString()),
                };
            })),
            returnUrl: `${YOUR_DOMAIN}/api/payos/payment-success`,
            cancelUrl: `${YOUR_DOMAIN}/api/payos/payment-cancel`,
        };


        try {

            const paymentLinkResponse = await this.payOS.createPaymentLink(paymentData);

            if (paymentLinkResponse && paymentLinkResponse.paymentLinkId) {

                return paymentLinkResponse.checkoutUrl;
            } else {
                throw new Error('Invalid response from PayOS');
            }
        } catch (error) {
            console.error('Error creating payment link:', error);
            throw new Error(`Failed to create payment link: ${error.message}`);
        }
    }

    async getPaymentInfo(id: number) {

        const response = await this.payOS.getPaymentLinkInformation(id);

        if (response.status === "PAID") {
            const order = await this.orderDetailRepository.findOne({ where: { id: id } });
            if (order) {
                order.status = OrderStatus.PENDING;
                await this.orderDetailRepository.save(order);
                return { message: 'Payment was success. Order updated to SUCCESS.' };
            }
        }
        else if (response.status === "CANCELLED") {
            const order = await this.orderDetailRepository.findOne({ where: { id: id } });
            if (order && order.status == OrderStatus.TRANSFERRING) {
                order.status = OrderStatus.FAILURE;
                const books = order.books;
                for (const el of books) {
                    const book = await this.bookRepository.findOne({ where: { id: el.bookId } });
                    book.quantity += el.quantity;
                    await this.bookRepository.save(book);
                }
                await this.orderDetailRepository.save(order);
            }
            return { message: 'Payment was canceled. Order updated to CANCELLED.' };
        }
    }
}