/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Book } from '../book/entity/book.entity';
import { User } from '../auth/user.entity';
import { BookItemDto } from './dto/book-item.dto';

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
                        sellingPrice: item.book.sellingPrice,
                        image_id: item.book.image_id
                    }
                }))
            };
        } catch (error) {
            throw new Error(`Error fetching cart items: ${error.message}`);
        }
    }

    async AddBooksToCart(userId: number, books: { id: number; quantity: number }[]) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        await this.cartItemRepository.delete({ user: { id: userId } });
      
        const newCartItems = [];
        const result = [];
        for (const { id, quantity } of books) { 
          const book = await this.bookRepository.findOne({ where: { id: id } });
          if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
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
            const cartItem = { quantity: newCartItem.quantity, title: book.title, image_id: book.image_id, id: book.id, sellingPrice: book.sellingPrice }
            result.push(cartItem)
          newCartItems.push(newCartItem);
        }
        await this.cartItemRepository.save(newCartItems)
        return result;
      }

    async deleteBookFromCart(userId: number, id: number) {
        const cartItem = await this.cartItemRepository.findOne({
            where: { user: { id: userId }, book: { id: id } },
        });
        if (!cartItem) {
            throw new NotFoundException('CartItem not found');
        }
        await this.cartItemRepository.remove(cartItem);
        return { message: 'CartItem removed successfully' };
    }
    async getCart(cartDto: BookItemDto[]) {
        const cart = await Promise.all(
            cartDto.map(async (item) => {
                return await this.bookRepository.findOne({
                    where: { id: item.id },
                    select: ['title', 'sellingPrice', 'image_id','id'],
                });
            })
        );
        return cart;
    }
}
