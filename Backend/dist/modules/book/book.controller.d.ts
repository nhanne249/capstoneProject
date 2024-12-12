import { BookService } from './book.service';
import { ImageService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BookController {
    private readonly bookService;
    private readonly imageService;
    constructor(bookService: BookService, imageService: ImageService);
    getBookByAdmin(bookId: number): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: import("./entity/book.entity").Book;
    }>;
    getBookByUser(bookId: number): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: {
            image_id: number[];
            title: string;
            author: string;
            sellingPrice: number;
            description: string;
            quantity: number;
        };
    }>;
    updateBook(bookId: number, updateBookDto: UpdateBookDto): Promise<{
        message: string;
        data: import("./entity/book.entity").Book;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteBook(bookId: number): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    addBook(createBookDto: CreateBookDto): Promise<import("./entity/book.entity").Book | {
        message: string;
    }>;
}
export declare class BooksController {
    private readonly bookService;
    constructor(bookService: BookService);
    getAllBooks(page: string): Promise<{
        message: string;
        response: import("../../pagination.dto").PaginationResponse<import("./dto/book.dto").BookDto>;
        error?: undefined;
    } | {
        message: string;
        error: any;
        response?: undefined;
    }>;
    getAllBooksByUser(page: string): Promise<{
        message: string;
        response: {
            data: {
                id: number;
                title: string;
                author: string;
                sellingPrice: number;
                description: string;
                image_id: number[];
            }[];
            pageNumber: number;
            pageSize: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
        error?: undefined;
    } | {
        message: string;
        error: any;
        response?: undefined;
    }>;
    searchBook(search: string, page: string): Promise<{
        message: string;
        data: {
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
        };
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    sortByPrice(order: 'asc' | 'desc', page: string): Promise<{
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
    getNewestBook(): Promise<import("./entity/book.entity").Book[]>;
}
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    uploadImage(file: Express.Multer.File): Promise<{
        message: string;
        image_id: number;
    }>;
    getImageById(id: number, res: any): Promise<void>;
    deleteImage(id: number): Promise<{
        message: string;
        data: {
            id: number;
        };
    } | {
        message: any;
        data: any;
    }>;
}
