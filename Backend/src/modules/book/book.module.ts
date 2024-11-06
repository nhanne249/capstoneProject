import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController, BooksController } from './book.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Book]),
    JwtModule.register({
        secret: process.env.JWT_SECRET
      }),],
    providers: [BookService],
    controllers: [BookController, BooksController],
})
export class BookModule { }
