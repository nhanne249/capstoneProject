/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, Delete, Query, Param,  } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';

@Controller('api/book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get(':bookId')
    async getBook(
        @Param('bookId') bookId: number,) {
        const book = await this.bookService.getBookById(bookId);

        if (!book) {
            return { message: 'Book not found' };
        }

        return { message: 'Book retrieved successfully', data: book };
    }

    @Put(':bookId')
    async updateBook(
        @Body() bookDto: BookDto, @Param('bookId') bookId: number) {
        try {
            await this.bookService.updateBook(bookDto, bookId);

            return { message: 'Book updated successfully', data: bookDto };
        } catch {
            return {
                message: 'Error updating book'
            };
        }
    }

    @Delete(':bookId')
    async deleteBook(
        @Param('bookId') bookId: number) {
        try {
            const deletedBook = await this.bookService.deleteBook(bookId);

            if (!deletedBook) {
                return { message: 'Book not found or deletion failed' };
            }

            return { message: 'Book deleted successfully' };
        } catch {
            return {
                message: 'Error delete book',
            }
        }
    }

    @Post()
    async addBook(@Body() bookDto: BookDto) {
        try {
            const existingBook = await this.bookService.getBookByTitle(bookDto.title);

            if (existingBook) {
                return {
                    message: 'Book already exists',
                };
            }
            return this.bookService.addBook(bookDto);
        } catch {
            return {
                message: 'Error adding book',
            }
        }
    }

}

@Controller('api/books')
export class BooksController {
    constructor(private readonly bookService: BookService) { }
    @Get()
    async getAllBooks(@Query('page') page: string) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const books = await this.bookService.getAllBooks(pageNumber);
            return {
                message: 'Find all books successfully',
                response: books,
            };
        } catch (error) {
            return {
                message: 'Error get all books',
                error: error.message,
            };
        }
    }

    @Get()
    async searchBook(
        @Query('search') search: string,
        @Query('page') page: string ) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const books = await this.bookService.searchBooks(search, pageNumber);
            return {
                message: 'Search books successfully',
                data: books,
            };
        } catch (error) {
            console.log(page);
            return {
                message: 'Error search books',
                error: error.message,
            };
        }
    }
}