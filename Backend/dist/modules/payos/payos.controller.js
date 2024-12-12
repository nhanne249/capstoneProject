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
exports.PayosController = void 0;
const common_1 = require("@nestjs/common");
const payos_service_1 = require("./payos.service");
const order_detail_service_1 = require("../order-detail/order-detail.service");
const auth_guard_1 = require("../auth/auth.guard");
const typeorm_1 = require("@nestjs/typeorm");
const order_detail_entity_1 = require("../order-detail/order-detail.entity");
const typeorm_2 = require("typeorm");
let PayosController = class PayosController {
    constructor(paymentService, orderDetailService, orderDetailRepository) {
        this.paymentService = paymentService;
        this.orderDetailService = orderDetailService;
        this.orderDetailRepository = orderDetailRepository;
    }
    async createPaymentLink(orderId, paymentContent, request) {
        const userPayload = request['user'];
        const userId = userPayload.sub;
        if (!orderId || !paymentContent) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const order = await this.orderDetailService.getOrderById(orderId, userId);
        if (!order) {
            throw new common_1.BadRequestException('Order not found');
        }
        const paymentLink = await this.paymentService.createPaymentLink(orderId, order, paymentContent);
        return {
            message: 'Payment link created successfully',
            paymentLink,
        };
    }
    async paymentSuccess(query) {
        const { id } = query;
        const response = await this.paymentService.getPaymentInfo(id);
        return response;
    }
};
exports.PayosController = PayosController;
__decorate([
    (0, common_1.Post)('create-payment-link'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)('orderId')),
    __param(1, (0, common_1.Body)('paymentContent')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Request]),
    __metadata("design:returntype", Promise)
], PayosController.prototype, "createPaymentLink", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayosController.prototype, "paymentSuccess", null);
exports.PayosController = PayosController = __decorate([
    (0, common_1.Controller)('api/payos'),
    __param(2, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [payos_service_1.PayosService,
        order_detail_service_1.OrderDetailService,
        typeorm_2.Repository])
], PayosController);
//# sourceMappingURL=payos.controller.js.map