/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Book } from './book.entity';
import { BookDto } from './dto/book.dto';
import { PaginationResponse } from 'src/pagination.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) { }

    async getBookByTitle(title: string): Promise<Book> {
        return this.bookRepository.findOne({ where: { title: title } });
    }

    async getBookById(bookId: number): Promise<Book> {
        return this.bookRepository.findOne({ where: { id: bookId } });
    }
    async getAllBooks(page: number): Promise<PaginationResponse<BookDto>> {
        const pageSize = 10;
        const offset = (page - 1) * pageSize;

        const [books, total] = await this.bookRepository.findAndCount({
            skip: offset,
            take: pageSize,
        });
        const totalPages = Math.ceil(total / pageSize);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        return {
            data: books,
            pageNumber: page,
            pageSize: pageSize,
            total: total,
            totalPages: totalPages,
            hasNextPage: hasNextPage,
            hasPreviousPage: hasPreviousPage,
        };
    }

    async deleteBook(bookId: number) {
        return await this.bookRepository.delete(bookId);
    }

    async updateBook(bookDto: BookDto,bookId: number ): Promise<Book> {
        const book = await this.bookRepository.findOne({ where: { id: bookId } });
        const updatedBook = this.bookRepository.merge(book, bookDto);
        return this.bookRepository.save(updatedBook);  // Save the updated book
    }

    async addBook(book: BookDto): Promise<Book> {
        const newBook = this.bookRepository.create(book);
        return this.bookRepository.save(newBook);
    }

    async searchBooks(search: string, page: number) {
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        const [books, total] = await this.bookRepository.findAndCount({
            where: [
                { title: ILike(`%${search}%`) },
                { author: ILike(`%${search}%`) },
                { description: ILike(`%${search}%`) }
            ],
            select: ['title', 'quantity', 'author', 'description', 'costPrice', 'sellingPrice'],
            skip: offset,
            take: pageSize,
        });
        return {
            data: books,
            pageNumber: page,
            pageSize: pageSize,
            total: total,
        };
    }
}
