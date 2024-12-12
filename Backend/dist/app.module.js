"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const user_entity_1 = require("./modules/auth/user.entity");
const book_entity_1 = require("./modules/book/entity/book.entity");
const user_module_1 = require("./modules/user/user.module");
const book_module_1 = require("./modules/book/book.module");
const config_1 = require("@nestjs/config");
const cart_item_module_1 = require("./modules/cart-item/cart-item.module");
const cart_item_entity_1 = require("./modules/cart-item/cart-item.entity");
const review_module_1 = require("./modules/review/review.module");
const review_entity_1 = require("./modules/review/review.entity");
const order_detail_entity_1 = require("./modules/order-detail/order-detail.entity");
const order_detail_module_1 = require("./modules/order-detail/order-detail.module");
const image_entity_1 = require("./modules/book/entity/image.entity");
const payos_module_1 = require("./modules/payos/payos.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DATABASE_HOST'),
                    port: configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USERNAME'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    entities: [user_entity_1.User, book_entity_1.Book, cart_item_entity_1.CartItem, review_entity_1.Review, order_detail_entity_1.OrderDetail, image_entity_1.Image],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule, user_module_1.UsersModule, book_module_1.BookModule, cart_item_module_1.CartItemModule, review_module_1.ReviewModule, order_detail_module_1.OrderDetailModule, payos_module_1.PayosModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map