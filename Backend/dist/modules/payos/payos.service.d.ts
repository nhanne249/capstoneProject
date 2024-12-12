import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { OrderDetail } from 'src/modules/order-detail/order-detail.entity';
import { Book } from '../book/entity/book.entity';
export declare class PayosService {
    private configService;
    private orderDetailRepository;
    private bookRepository;
    private payOS;
    constructor(configService: ConfigService, orderDetailRepository: Repository<OrderDetail>, bookRepository: Repository<Book>);
    createPaymentLink(orderId: number, order: OrderDetail, paymentContent: string): Promise<string>;
    getPaymentInfo(id: number): Promise<{
        message: string;
    }>;
}
