import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Book } from '../book/entity/book.entity';
import { User } from '../auth/user.entity';
import { BookItemDto } from './dto/book-item.dto';
export declare class CartItemService {
    private cartItemRepository;
    private userRepository;
    private bookRepository;
    constructor(cartItemRepository: Repository<CartItem>, userRepository: Repository<User>, bookRepository: Repository<Book>);
    getAllCartItems(userId: number): Promise<{
        message: string;
        cartItems?: undefined;
    } | {
        cartItems: {
            book: {
                title: string;
                quantity: number;
                sellingPrice: number;
                image_id: number[];
            };
        }[];
        message?: undefined;
    }>;
    AddBooksToCart(userId: number, books: {
        id: number;
        quantity: number;
    }[]): Promise<any[]>;
    deleteBookFromCart(userId: number, id: number): Promise<{
        message: string;
    }>;
    getCart(cartDto: BookItemDto[]): Promise<Book[]>;
}
