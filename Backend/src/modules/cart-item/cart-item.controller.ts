/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AddCartDto } from './dto/add-to-cart.dto';

@Controller('api/cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

    @Get('cart')
    getAllCartItems() {
      return this.cartItemService.getAllCartItems();  
    }

    @Post('add')
    @UsePipes(ValidationPipe)
    AddBookToCart(@Body() addCartDto: AddCartDto) {
        return this.cartItemService.AddBookToCart(
            addCartDto.userId, 
            addCartDto.bookId, 
            addCartDto.quantity
        );
    }

    @Delete(':id')
    deleteBookFromCart(@Param('id', ParseIntPipe) cartItemId: number): Promise<void> {
        return this.cartItemService.deleteBookFromCart(cartItemId);
    }
}
