import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Book } from './entity/book.entity';
import { Image } from './entity/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService, ImageService } from './book.service';
import { BookController, BooksController, ImageController } from './book.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Book, Image]),
    JwtModule.register({
        secret: process.env.JWT_SECRET
      }),],
    providers: [BookService, ImageService],
    controllers: [BookController, BooksController, ImageController],
})
export class BookModule { }
