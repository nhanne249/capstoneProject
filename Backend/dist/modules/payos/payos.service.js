"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayosService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const PayOS = require("@payos/node");
const order_detail_entity_1 = require("../order-detail/order-detail.entity");
const enum_1 = require("../order-detail/enum");
const book_entity_1 = require("../book/entity/book.entity");
const axios = require('axios');
let PayosService = class PayosService {
    constructor(configService, orderDetailRepository, bookRepository) {
        this.configService = configService;
        this.orderDetailRepository = orderDetailRepository;
        this.bookRepository = bookRepository;
        this.payOS = new PayOS(this.configService.get('PAYOS_CLIENT_ID'), this.configService.get('PAYOS_API_KEY'), this.configService.get('PAYOS_CHECKSUM_KEY'));
    }
    async createPaymentLink(orderId, order, paymentContent) {
        const YOUR_DOMAIN = this.configService.get('YOUR_DOMAIN');
        if (!order.cartItem || order.cartItem.length === 0) {
            throw new Error('Order does not contain any books');
        }
        const paymentData = {
            orderCode: orderId,
            amount: parseFloat(order.totalPrice.toString()),
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
            }
            else {
                throw new Error('Invalid response from PayOS');
            }
        }
        catch (error) {
            console.error('Error creating payment link:', error);
            throw new Error(`Failed to create payment link: ${error.message}`);
        }
    }
    async getPaymentInfo(id) {
        const response = await this.payOS.getPaymentLinkInformation(id);
        if (response.status === "PAID") {
            const order = await this.orderDetailRepository.findOne({ where: { id: id } });
            if (order) {
                order.status = enum_1.OrderStatus.PENDING;
                await this.orderDetailRepository.save(order);
                return { message: 'Payment was success. Order updated to SUCCESS.' };
            }
        }
        else if (response.status === "CANCELLED") {
            const order = await this.orderDetailRepository.findOne({ where: { id: id } });
            if (order && order.status == enum_1.OrderStatus.TRANSFERRING) {
                order.status = enum_1.OrderStatus.FAILURE;
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
};
exports.PayosService = PayosService;
exports.PayosService = PayosService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PayosService);
//# sourceMappingURL=payos.service.js.map