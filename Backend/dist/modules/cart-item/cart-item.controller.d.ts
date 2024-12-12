import { CartItemService } from './cart-item.service';
import { DeleteBookFromCartDto } from './dto/delete-to-cart.dto';
import { BookItemDto } from './dto/book-item.dto';
export declare class CartItemController {
    private readonly cartItemService;
    constructor(cartItemService: CartItemService);
    getAllCartItems(request: Request): Promise<{
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
    getCart(cartDto: BookItemDto[]): Promise<import("../book/entity/book.entity").Book[]>;
    AddBooksToCart(addCartDto: BookItemDto[], request: Request): Promise<any[]>;
    deleteBookFromCart(deleteBookFromCartDto: DeleteBookFromCartDto, request: Request): Promise<{
        message: string;
    }>;
}
