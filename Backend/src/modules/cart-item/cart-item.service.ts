/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Book } from '../book/book.entity';
// import { AddCartDto } from './dto/add-to-cart.dto';


@Injectable()
export class CartItemService {
    constructor(
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,

        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async getAllCartItems(): Promise<CartItem[]> {
        try {
          const cartItems = await this.cartItemRepository.find();
          return cartItems;
        } catch (error) {
          throw new Error(`Error fetching cart items: ${error.message}`);
        }
    }

    async AddBookToCart(userId: number, bookId: number, quantity: number) {
        const book = await this.bookRepository.findOneBy({ id: bookId });
        if (!book) {
            throw new Error('Book not found');
        }
    
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
    
        const newCartItem = this.cartItemRepository.create({
            userId,
            bookId,
            price: book.sellingPrice * quantity,  
            quantity,  
        });
    
        await this.cartItemRepository.save(newCartItem);
    
        return newCartItem;
    }

    async deleteBookFromCart(cartItemId: number): Promise<void> {
        const cartItem = await this.cartItemRepository.findOneBy({ id: cartItemId });

        if (!cartItem) {
          throw new NotFoundException('Cart item not found');
        }
    
        await this.cartItemRepository.remove(cartItem);
      }
    
}
