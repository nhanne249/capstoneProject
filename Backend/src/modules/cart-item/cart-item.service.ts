import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Book } from '../book/book.entity';
import { AddCartDto } from './dto/add-to-cart.dto';
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
              where: { userId }, 
          });
          if(!cartItems) throw new NotFoundException('Not found item of this user')
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

    async deleteBookFromCart(userId: number, bookId: number): Promise<void> {
        const cartItem = await this.cartItemRepository.findOne({ where: { userId, bookId } });
        if (!cartItem) {
          throw new Error('CartItem not found');
        }
        await this.cartItemRepository.remove(cartItem);
    }
    
}
