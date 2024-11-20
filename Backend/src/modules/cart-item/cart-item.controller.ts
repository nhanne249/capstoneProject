/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe, ParseIntPipe, SetMetadata, Req, UseGuards } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { AddCartDto } from './dto/add-to-cart.dto';
import { DeleteBookFromCartDto } from './dto/delete-to-cart.dto';
import { AuthGuard, RolesGuard } from '../auth/auth.guard';
import { BookItemDto } from './dto/book-item.dto';

const Roles = (...role: string[]) => SetMetadata('role', role);

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

  @UsePipes(ValidationPipe)
  @Post() 
  AddBooksToCart(@Body(new ValidationPipe({ transform: true })) addCartDto: BookItemDto[], @Req() request: Request,) {
    const userPayload = request['user'];
    const userId = userPayload.sub;
    return this.cartItemService.AddBooksToCart(userId, addCartDto);
  }

  @Delete()
  async deleteBookFromCart(@Body() deleteBookFromCartDto: DeleteBookFromCartDto, @Req() request: Request) {
    const userPayload = request['user'];
    const userId = userPayload.sub;
    return this.cartItemService.deleteBookFromCart(userId, deleteBookFromCartDto.bookId);
  }
}
