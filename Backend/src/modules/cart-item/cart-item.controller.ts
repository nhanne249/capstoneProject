/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AddCartDto } from './dto/add-to-cart.dto';
import { DeleteBookFromCartDto } from './dto/delete-to-cart.dto';
import { AuthGuard, RolesGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) { }

  @Get()
  getAllCartItems(@Req() request: Request) {
    const userPayload = request['user'];
    const userId = userPayload.sub;
    return this.cartItemService.getAllCartItems(userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  AddBookToCart(@Body() addCartDto: AddCartDto, @Req() request: Request) {
    const userPayload = request['user'];
    const userId = userPayload.sub;
    return this.cartItemService.AddBookToCart(userId, addCartDto.bookId, addCartDto.quantity);
  }

  @Delete()
  async deleteBookFromCart(@Body() deleteBookFromCartDto: DeleteBookFromCartDto, @Req() request: Request) {
    const userPayload = request['user'];
    const userId = userPayload.sub;
    return this.cartItemService.deleteBookFromCart(userId, deleteBookFromCartDto.bookId);
  }
}
