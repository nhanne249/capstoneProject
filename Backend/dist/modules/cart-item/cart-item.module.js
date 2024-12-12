"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const cart_item_controller_1 = require("./cart-item.controller");
const cart_item_service_1 = require("./cart-item.service");
const cart_item_entity_1 = require("./cart-item.entity");
const book_entity_1 = require("../book/entity/book.entity");
const user_entity_1 = require("../auth/user.entity");
const order_detail_entity_1 = require("../order-detail/order-detail.entity");
let CartItemModule = class CartItemModule {
};
exports.CartItemModule = CartItemModule;
exports.CartItemModule = CartItemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cart_item_entity_1.CartItem, book_entity_1.Book, user_entity_1.User, order_detail_entity_1.OrderDetail]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET
            }),],
        controllers: [cart_item_controller_1.CartItemController],
        providers: [cart_item_service_1.CartItemService]
    })
], CartItemModule);
//# sourceMappingURL=cart-item.module.js.map