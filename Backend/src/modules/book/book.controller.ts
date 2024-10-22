import { Body, Controller, Post, Get, Param, Put, Delete, Query, ParseIntPipe  } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get()
    async getBook(
        @Body('bookId') bookId: number,) {
        const book = await this.bookService.getBookById(bookId);

        if (!book) {
            return { message: 'Book not found' };
        }

        return { message: 'Book retrieved successfully', data: book };
    }

    @Put()
    async updateBook(
        @Body() updateBookDto: UpdateBookDto) {
        try {
            const updatedBook = await this.bookService.getBookById(updateBookDto.bookId);

            if (!updatedBook) {
                return { message: 'Book not found', data: null };
            }
            await this.bookService.updateBook(updatedBook, updateBookDto);

            return { message: 'Book updated successfully', data: updatedBook };
        } catch {
            return {
                message: 'Error updating book'
            };
        }
    }

    @Delete()
    async deleteBook(
        @Body('bookId') bookId: number) {
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

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BookService) { }
    @Get()
    async getAllBooks(@Query('page') page: string) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const books = await this.bookService.getAllBooks(pageNumber);
            return {
                message: 'Find all books successfully',
                data: books,
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