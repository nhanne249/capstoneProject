/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { DeleteBookFromCartDto } from './dto/delete-to-cart.dto';
import { AuthGuard, RolesGuard } from '../auth/auth.guard';
import { BookItemDto } from './dto/book-item.dto';

@Controller('api/cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService,
  ) { }

  
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getAllCartItems(@Req() request: Request) {
    const userPayload = request['user'];
    const userId = userPayload.sub;
    return this.cartItemService.getAllCartItems(userId);
  }

  @Post('/sync')
  getCart(@Body() cartDto: BookItemDto[]) {
    return this.cartItemService.getCart(cartDto);
  }

  
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Post() 
  AddBooksToCart(@Body(new ValidationPipe({ transform: true })) addCartDto: BookItemDto[], @Req() request: Request,) {
    const userPayload = request['user'];
    const userId = userPayload.sub;
    return this.cartItemService.AddBooksToCart(userId, addCartDto);
  }

  
  @UseGuards(AuthGuard, RolesGuard)
  @Delete()
  async deleteBookFromCart(@Body() deleteBookFromCartDto: DeleteBookFromCartDto, @Req() request: Request) {
    const userPayload = request['user'];
    const userId = userPayload.sub;
    return this.cartItemService.deleteBookFromCart(userId, deleteBookFromCartDto.bookId);
  }
}
