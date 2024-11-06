/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, Delete, Query, Param, SetMetadata, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard, RolesGuard } from '../auth/auth.guard';

const Roles = (...role: string[]) => SetMetadata('role', role);

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Roles('Admin')
    @Get()
    async getBook(
        @Body('bookId') bookId: number,) {
        const book = await this.bookService.getBookById(bookId);

        if (!book) {
            return { message: 'Book not found' };
        }

        return { message: 'Book retrieved successfully', data: book };
    }

    @Roles('Admin')
    @Put()
    async updateBook(
        @Body() updateBookDto: UpdateBookDto  ) {
        try {
            const updatedBook = await this.bookService.getBookById(updateBookDto.bookId);

            if (!updatedBook) {
                return { message: 'Book not found', data: null };
            }
            const result = await this.bookService.updateBook(updateBookDto, updateBookDto.bookId);


            return { message: 'Book updated successfully', data: result };
        } catch {
            return {
                message: 'Error updating book'
            };
        }
    }

    @Roles('Admin')
    @Delete()
    async deleteBook(
        @Body('bookId') bookId: number) {
        try {
            const deletedBook = await this.bookService.deleteBook(bookId);

            if (!deletedBook) {
                return { message: 'Book not found or deletion failed' };
            }

            return { message: 'Book deleted successfully' };
        } catch (e){
            return {
                message: 'Error delete book',
                error: e.message,
            }
        }
    }

    @Roles('Admin')
    @Post()
    async addBook(@Body() createBookDto: CreateBookDto) {
        try {
            const existingBook = await this.bookService.getBookByTitle(createBookDto.title);

            if (existingBook) {
                return {
                    message: 'Book already exists',
                };
            }
            return this.bookService.addBook(createBookDto);
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

    @Get('search')
    async searchBook(
        @Query('search') search: string,
        @Query('page') page: string) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const books = await this.bookService.searchBooks(search, pageNumber);
            console.log(books)
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

    @Get('sort')
    async sortByPrice(
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('page') page: string) {
        const pageNumber = page ? parseInt(page, 10) : 1;
        return this.bookService.sortBooksByPrice(order, pageNumber);
    }

    @Get("newest")
    getNewestBook() {
        return this.bookService.getNewestBooks();
    }
}