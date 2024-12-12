"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const book_entity_1 = require("./entity/book.entity");
const image_entity_1 = require("./entity/image.entity");
const typeorm_1 = require("@nestjs/typeorm");
const book_service_1 = require("./book.service");
const book_controller_1 = require("./book.controller");
let BookModule = class BookModule {
};
exports.BookModule = BookModule;
exports.BookModule = BookModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([book_entity_1.Book, image_entity_1.Image]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET
            }),],
        providers: [book_service_1.BookService, book_service_1.ImageService],
        controllers: [book_controller_1.BookController, book_controller_1.BooksController, book_controller_1.ImageController],
    })
], BookModule);
//# sourceMappingURL=book.module.js.map