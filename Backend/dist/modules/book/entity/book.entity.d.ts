import { CartItem } from '../../cart-item/cart-item.entity';
import { Review } from '../../review/review.entity';
import { Image } from './image.entity';
export declare class Book {
    id: number;
    title: string;
    quantity: number;
    author: string;
    description: string;
    costPrice: number;
    sellingPrice: number;
    review: Review[];
    cart_item: CartItem[];
    image: Image[];
    image_id: number[];
}
