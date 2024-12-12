import { PayosService } from './payos.service';
import { OrderDetailService } from 'src/modules/order-detail/order-detail.service';
import { OrderDetail } from 'src/modules/order-detail/order-detail.entity';
import { Repository } from 'typeorm';
export declare class PayosController {
    private paymentService;
    private orderDetailService;
    private orderDetailRepository;
    constructor(paymentService: PayosService, orderDetailService: OrderDetailService, orderDetailRepository: Repository<OrderDetail>);
    createPaymentLink(orderId: number, paymentContent: string, request: Request): Promise<{
        message: string;
        paymentLink: string;
    }>;
    paymentSuccess(query: any): Promise<{
        message: string;
    }>;
}
