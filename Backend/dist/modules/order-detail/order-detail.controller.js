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
exports.OrderDetailController = void 0;
const common_1 = require("@nestjs/common");
const order_detail_service_1 = require("./order-detail.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const auth_guard_1 = require("../auth/auth.guard");
const Roles = (...role) => (0, common_1.SetMetadata)('role', role);
let OrderDetailController = class OrderDetailController {
    constructor(orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    async createOrder(createOrderDto, request) {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            const data = await this.orderDetailService.createOrder(createOrderDto, userId);
            return {
                message: "Create order successfully",
                data,
            };
        }
        catch (error) {
            return {
                message: "Create order failed.",
                error: error.message,
            };
        }
    }
    async getAllOrdersByAdmin(page) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const orders = await this.orderDetailService.getAllOrdersByAdmin(pageNumber);
            return {
                message: "Retrieve all orders by Admin successfully",
                data: orders,
            };
        }
        catch (error) {
            return {
                message: "Failed to retrieve all orders by Admin.",
                error: error.message,
            };
        }
    }
    async getOrderById(id, request) {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            const order = await this.orderDetailService.getOrderById(id, userId);
            return {
                message: "Order retrieved successfully",
                data: order,
            };
        }
        catch (error) {
            return {
                message: "Failed to retrieve order.",
                error: error.message,
            };
        }
    }
    async getAllOrders(request) {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            const orders = await this.orderDetailService.getAllOrders(userId);
            return {
                message: "Retrieve all orders successfully",
                data: orders,
            };
        }
        catch (error) {
            return {
                message: "Failed to retrieve all orders.",
                error: error.message,
            };
        }
    }
    async updateOrder(id, updateOrderDto, request) {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            const updatedOrder = await this.orderDetailService.updateOrder(id, updateOrderDto, userId);
            return {
                message: "Order updated successfully",
                data: updatedOrder,
            };
        }
        catch (error) {
            return {
                message: "Failed to update order.",
                error: error.message,
            };
        }
    }
    async deleteOrder(id, request) {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            await this.orderDetailService.deleteOrder(id, userId);
            return {
                message: "Order deleted successfully",
            };
        }
        catch (error) {
            return {
                message: "Failed to delete order.",
                error: error.message,
            };
        }
    }
    async getRevenueByMonth(body, request) {
        const { year, month } = body;
        return this.orderDetailService.getRevenueByMonth(year, month);
    }
    async getTotalQuantitySoldByMonth(body) {
        const { year, month } = body;
        return this.orderDetailService.getTotalQuantitySoldByMonth(year, month);
    }
};
exports.OrderDetailController = OrderDetailController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Request]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "createOrder", null);
__decorate([
    Roles('Admin'),
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getAllOrdersByAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Request]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getAllOrders", null);
__decorate([
    Roles('Admin'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_dto_1.UpdateOrderDto, Request]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "updateOrder", null);
__decorate([
    Roles('Admin'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Request]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Post)('revenue'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getRevenueByMonth", null);
__decorate([
    (0, common_1.Post)('quantity-sold'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getTotalQuantitySoldByMonth", null);
exports.OrderDetailController = OrderDetailController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    (0, common_1.Controller)('api/order'),
    __metadata("design:paramtypes", [order_detail_service_1.OrderDetailService])
], OrderDetailController);
//# sourceMappingURL=order-detail.controller.js.map