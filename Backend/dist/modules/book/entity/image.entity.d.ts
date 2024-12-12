import { Book } from './book.entity';
export declare class Image {
    id: number;
    image: Buffer;
    book: Book;
    bookId: number;
    mimeType: string;
    fileName: string;
    size: number;
}
