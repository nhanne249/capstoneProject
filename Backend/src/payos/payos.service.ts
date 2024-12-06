import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PayOS from '@payos/node';
import { OrderDetail } from 'src/modules/order-detail/order-detail.entity';
import { OrderDetailService } from 'src/modules/order-detail/order-detail.service'; // Đảm bảo inject service OrderDetailService để cập nhật đơn hàng

@Injectable()
export class PayosService {
  private payOS: PayOS;

  constructor(
    private configService: ConfigService,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {
    this.payOS = new PayOS(
      this.configService.get<string>('PAYOS_CLIENT_ID'),
      this.configService.get<string>('PAYOS_API_KEY'),
      this.configService.get<string>('PAYOS_CHECKSUM_KEY'),
    );
  }

  async createPaymentLink(orderId: number, order: OrderDetail, bankName: string, paymentContent: string) {
    const YOUR_DOMAIN = this.configService.get<string>('YOUR_DOMAIN');

    if (!order.cartItem || order.cartItem.length === 0) {
      throw new Error('Order does not contain any books');
    }

    const paymentData = {
      orderCode: orderId, 
      amount: parseFloat(order.totalPrice.toString()),  // Chuyển đổi thành số
      description: paymentContent,
      items: order.cartItem.map((item) => ({
        name: `Book ID: ${item.bookId}`,
        quantity: item.quantity,
        price: parseFloat(item.sellingPrice.toString()),  // Chuyển đổi thành số
      })),
      bankName: bankName,
      returnUrl: `${YOUR_DOMAIN}/api/payos/payment-success`,
      cancelUrl: `${YOUR_DOMAIN}/api/payos/payment-cancel`,
    };
    

    try {
      console.log('Order books:', order.books); 

      const paymentLinkResponse = await this.payOS.createPaymentLink(paymentData);
      console.log('Payment link response:', paymentLinkResponse);

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
}
