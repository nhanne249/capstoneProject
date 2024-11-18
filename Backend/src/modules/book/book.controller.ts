/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, Delete, Query, SetMetadata, UseGuards, Param, UseInterceptors, UploadedFile,Response } from '@nestjs/common';
import { BookService } from './book.service';
import { ImageService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard, RolesGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

const Roles = (...role: string[]) => SetMetadata('role', role);

@Controller('api/book')
export class BookController {
    constructor(
        private readonly bookService: BookService,
        private readonly imageService: ImageService
    ) { }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @Get(':bookId')
    async getBookByAdmin(
        @Param('bookId') bookId: number,) {
        const book = await this.bookService.getBookById(bookId);

        if (!book) {
            return { message: 'Book not found' };
        }

        return { message: 'Book retrieved successfully', data: book };
    }

    @Get('/public/:bookId')
    async getBookByUser(
        @Param('bookId') bookId: number,) {
        const book = await this.bookService.getBookById(bookId);

        if (!book) {
            return { message: 'Book not found' };
        }

        const { title, author, sellingPrice, description, quantity, image_id } = book;

        return {
            message: 'Book retrieved successfully',
            data: {
                image_id,
                title,
                author,
                sellingPrice,
                description, quantity
            }
        };
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @Put(':bookId')
    async updateBook(
        @Param('bookId') bookId: number,
        @Body() updateBookDto: UpdateBookDto) {
        try {
            const updatedBook = await this.bookService.getBookById(bookId);

            if (!updatedBook) {
                return { message: 'Book not found', data: null };
            }
            const result = await this.bookService.updateBook(updateBookDto, bookId);

            if (updateBookDto.image_id) {
                await this.imageService.updateImage(bookId, updateBookDto.image_id);
            }

            return { message: 'Book updated successfully', data: result };
        } catch (e) {
            return {
                message: 'Error updating book',
                error: e
            };
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @Delete(':bookId')
    async deleteBook(
        @Param('bookId') bookId: number) {
        try {
            const deletedBook = await this.bookService.deleteBook(bookId);

            if (!deletedBook) {
                return { message: 'Book not found or deletion failed' };
            }

            return { message: 'Book deleted successfully' };
        } catch (e) {
            return {
                message: 'Error delete book',
                error: e.message,
            }
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
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

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
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

    @Get('/public')
    async getAllBooksByUser(@Query('page') page: string) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const books = await this.bookService.getAllBooks(pageNumber);
            const transformedBooks = books.data.map(book => ({
                id: book.id,
                title: book.title,
                author: book.author,
                sellingPrice: book.sellingPrice,
                description: book.description,
                image_id: book.image_id,
            }));

            return {
                message: 'Find all books successfully',
                response: {
                    data: transformedBooks,
                    pageNumber: books.pageNumber,
                    pageSize: books.pageSize,
                    total: books.total,
                    totalPages: books.totalPages,
                    hasNextPage: books.hasNextPage,
                    hasPreviousPage: books.hasPreviousPage
                }
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
            return {
                message: 'Search books successfully',
                data: books,
            };
        } catch (error) {
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

@Controller('api/image')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin')
    @Post()
    @UseInterceptors(FileInterceptor('file')) 
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const savedImage = await this.imageService.saveImageFile(file); 
        return {
            message: 'Upload image successfully.',
            image_id: savedImage.id,
        };
    }

    @Get(':id')
    async getImageById(@Param('id') id: number, @Response() res) {
        const image = await this.imageService.getImageById(id);
        res.set({
            'Content-Type': image.mimeType,
            'Content-Disposition': `inline; filename="${image.fileName}"`,
        });
        res.send(image.image);
    }
}