/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Book } from '../book/entity/book.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class CartItemService {
    constructor(
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async getAllCartItems(userId: number) {
        try {
            const cartItems = await this.cartItemRepository.find({
                where: { user: { id: userId } }, // Tìm cart items theo user
                relations: ['book'], // Kèm theo dữ liệu book để hiển thị chi tiết
            });
            if (cartItems.length === 0) {
                return { message: "Not found items for this user" };
            }
            return {
                cartItems: cartItems.map(item => ({
                    book: {
                        title: item.book.title,
                        quantity: item.quantity,
                        author: item.book.author,
                        description: item.book.description,
                        sellingPrice: item.book.sellingPrice
                    }
                }))
            };
        } catch (error) {
            throw new Error(`Error fetching cart items: ${error.message}`);
        }
    }

    async AddBookToCart(userId: number, bookId: number, quantity: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const book = await this.bookRepository.findOne({ where: { id: bookId } });
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        const existingCartItem = await this.cartItemRepository.findOne({
            where: { user: { id: userId }, book: { id: bookId } },
        });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            existingCartItem.price = book.sellingPrice * existingCartItem.quantity;
            await this.cartItemRepository.save(existingCartItem);
            return existingCartItem;
        } else {
            const newCartItem = this.cartItemRepository.create({
                user,
                book,
                price: book.sellingPrice * quantity,
                quantity,
            });
            await this.cartItemRepository.save(newCartItem);
            return newCartItem;
        }
    }

    async deleteBookFromCart(userId: number, bookId: number) {
        const cartItem = await this.cartItemRepository.findOne({
            where: { user: { id: userId }, book: { id: bookId } },
        });
        if (!cartItem) {
            throw new NotFoundException('CartItem not found');
        }
        await this.cartItemRepository.remove(cartItem);
        return { message: 'CartItem removed successfully' };
    }
}
