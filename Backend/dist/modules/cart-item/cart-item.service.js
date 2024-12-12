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
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_item_entity_1 = require("./cart-item.entity");
const book_entity_1 = require("../book/entity/book.entity");
const user_entity_1 = require("../auth/user.entity");
let CartItemService = class CartItemService {
    constructor(cartItemRepository, userRepository, bookRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    async getAllCartItems(userId) {
        try {
            const cartItems = await this.cartItemRepository.find({
                where: { user: { id: userId } },
                relations: ['book'],
            });
            if (cartItems.length === 0) {
                return { message: "Not found items for this user" };
            }
            return {
                cartItems: cartItems.map(item => ({
                    book: {
                        title: item.book.title,
                        quantity: item.quantity,
                        sellingPrice: item.book.sellingPrice,
                        image_id: item.book.image_id
                    }
                }))
            };
        }
        catch (error) {
            throw new Error(`Error fetching cart items: ${error.message}`);
        }
    }
    async AddBooksToCart(userId, books) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.cartItemRepository.delete({ user: { id: userId } });
        const newCartItems = [];
        const result = [];
        for (const { id, quantity } of books) {
            const book = await this.bookRepository.findOne({ where: { id: id } });
            if (!book) {
                throw new common_1.NotFoundException(`Book with ID ${id} not found`);
            }
            if (quantity <= 0) {
                throw new Error('Quantity must be greater than 0');
            }
            const newCartItem = this.cartItemRepository.create({
                user,
                book,
                sellingPrice: book.sellingPrice,
                quantity: quantity,
            });
            const cartItem = { quantity: newCartItem.quantity, title: book.title, image_id: book.image_id, id: book.id, sellingPrice: book.sellingPrice };
            result.push(cartItem);
            newCartItems.push(newCartItem);
        }
        await this.cartItemRepository.save(newCartItems);
        return result;
    }
    async deleteBookFromCart(userId, id) {
        const cartItem = await this.cartItemRepository.findOne({
            where: { user: { id: userId }, book: { id: id } },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('CartItem not found');
        }
        await this.cartItemRepository.remove(cartItem);
        return { message: 'CartItem removed successfully' };
    }
    async getCart(cartDto) {
        const cart = await Promise.all(cartDto.map(async (item) => {
            return await this.bookRepository.findOne({
                where: { id: item.id },
                select: ['title', 'sellingPrice', 'image_id', 'id'],
            });
        }));
        return cart;
    }
};
exports.CartItemService = CartItemService;
exports.CartItemService = CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartItemService);
//# sourceMappingURL=cart-item.service.js.map