import { Body, Controller, Delete, Get, Post, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AddCartDto } from './dto/add-to-cart.dto';
import { DeleteBookFromCartDto } from './dto/delete-to-cart.dto';

@Controller('api/cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

    @Get()
    getAllCartItems(@Body('userId') userId: number) {
      return this.cartItemService.getAllCartItems(userId);  
    }

    @Post()
    @UsePipes(ValidationPipe)
    AddBookToCart(@Body() addCartDto: AddCartDto) {
        return this.cartItemService.AddBookToCart(
            addCartDto.userId, 
            addCartDto.bookId, 
            addCartDto.quantity
        );
    }

    @Delete()
    async deleteBookFromCart(@Body() deleteBookFromCartDto: DeleteBookFromCartDto): Promise<void> {
      const { userId, bookId } = deleteBookFromCartDto;
      return this.cartItemService.deleteBookFromCart(userId, bookId);
    }
}
