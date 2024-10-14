import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { title } from 'process';

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
    async getAllBooks(page: number): Promise<Book[]> {
        const pageSize = 10;
        const offset = (page - 1) * pageSize;

        const books = await this.bookRepository.find({
            skip: offset,
            take: pageSize,
        });

        return books;
    }

    async deleteBook(bookId: number) {
        return await this.bookRepository.delete(bookId);
    }

    async updateBook(book: Book, updateBookDto: UpdateBookDto): Promise<Book> {
        const updatedBook = this.bookRepository.merge(book, updateBookDto);
        return this.bookRepository.save(updatedBook);  // Save the updated book
    }

    async addBook(createBookDto: CreateBookDto): Promise<Book> {
        const newBook = this.bookRepository.create(createBookDto);
        return this.bookRepository.save(newBook);
    }

    async searchBooks(search: string, page: number) {
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        const books = await this.bookRepository.find({
            where: [
                { title: ILike(`%${search}%`) },
                { author: ILike(`%${search}%`) },
                { description: ILike(`%${search}%`) }
            ],
            select: ['title', 'quantity', 'author', 'description', 'costPrice', 'sellingPrice'],
            skip: offset,
            take: pageSize,
        });
        return books;
    }
}
