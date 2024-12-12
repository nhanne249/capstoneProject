import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { Image } from './entity/image.entity';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationResponse } from 'src/pagination.dto';
export declare class BookService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    getBookByTitle(title: string): Promise<Book>;
    getBookById(bookId: number): Promise<Book>;
    getAllBooks(page: number): Promise<PaginationResponse<BookDto>>;
    deleteBook(bookId: number): Promise<import("typeorm").DeleteResult>;
    updateBook(updateBookDto: UpdateBookDto, bookId: number): Promise<Book>;
    addBook(createBookDto: CreateBookDto): Promise<Book>;
    searchBooks(search: string, page: number): Promise<{
        data: {
            image: string[];
            title: string;
            author: string;
            description: string;
            sellingPrice: number;
        }[];
        pageNumber: number;
        pageSize: number;
        total: number;
    }>;
    sortBooksByPrice(order: 'asc' | 'desc', page: number): Promise<{
        data: {
            image: string[];
            title: string;
            author: string;
            description: string;
            sellingPrice: number;
        }[];
        pageNumber: number;
        pageSize: number;
        total: number;
    }>;
    getNewestBooks(): Promise<Book[]>;
}
export declare class ImageService {
    private readonly imageRepository;
    private readonly bookRepository;
    constructor(imageRepository: Repository<Image>, bookRepository: Repository<Book>);
    saveImageFile(file: Express.Multer.File): Promise<Image>;
    getImageById(id: number): Promise<Image>;
    updateImage(bookId: number, imageIds: number[]): Promise<{
        message: string;
        data: any[];
    }>;
    deleteImage(id: number): Promise<{
        message: string;
        data: {
            id: number;
        };
    }>;
}
