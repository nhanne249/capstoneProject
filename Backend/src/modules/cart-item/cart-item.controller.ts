import { Body, Controller, Delete, Get, Post, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AddCartDto } from './dto/add-to-cart.dto';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

    @Get('api/cart')
    getAllCartItems() {
      return this.cartItemService.getAllCartItems();  
    }

    @Post('api/add')
    @UsePipes(ValidationPipe)
    AddBookToCart(@Body() addCartDto: AddCartDto) {
        return this.cartItemService.AddBookToCart(
            addCartDto.userId, 
            addCartDto.bookId, 
            addCartDto.quantity
        );
    }

    @Delete('api/delete/:id')
    deleteBookFromCart(@Param('id', ParseIntPipe) cartItemId: number): Promise<void> {
        return this.cartItemService.deleteBookFromCart(cartItemId);
    }
}
