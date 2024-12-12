"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayosModule = void 0;
const common_1 = require("@nestjs/common");
const payos_controller_1 = require("./payos.controller");
const payos_service_1 = require("./payos.service");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const order_detail_entity_1 = require("../order-detail/order-detail.entity");
const cart_item_entity_1 = require("../cart-item/cart-item.entity");
const user_entity_1 = require("../auth/user.entity");
const book_entity_1 = require("../book/entity/book.entity");
const order_detail_module_1 = require("../order-detail/order-detail.module");
const order_detail_service_1 = require("../order-detail/order-detail.service");
let PayosModule = class PayosModule {
};
exports.PayosModule = PayosModule;
exports.PayosModule = PayosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_detail_entity_1.OrderDetail, cart_item_entity_1.CartItem, user_entity_1.User, book_entity_1.Book]),
            order_detail_module_1.OrderDetailModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET
            }),
        ],
        controllers: [payos_controller_1.PayosController],
        providers: [payos_service_1.PayosService, order_detail_service_1.OrderDetailService]
    })
], PayosModule);
//# sourceMappingURL=payos.module.js.map