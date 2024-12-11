import { Controller, Post, Body, BadRequestException, Req, UseGuards, Query, Get } from '@nestjs/common';
import { PayosService } from './payos.service';
import { OrderDetailService } from 'src/modules/order-detail/order-detail.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/modules/order-detail/order-detail.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from 'src/modules/order-detail/enum';


@Controller('api/payos')
export class PayosController {
  constructor(
    private paymentService: PayosService,
    private orderDetailService: OrderDetailService,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>
  ) { }

  @Post('create-payment-link')
  @UseGuards(AuthGuard)
  async createPaymentLink(
    @Body('orderId') orderId: number,
    @Body('paymentContent') paymentContent: string,
    @Req() request: Request
  ) {
    const userPayload = request['user'];
    const userId = userPayload.sub;
    if (!orderId || !paymentContent) {
      throw new BadRequestException('Missing required fields');
    }

    const order = await this.orderDetailService.getOrderById(orderId, userId);
    if (!order) {
      throw new BadRequestException('Order not found');
    }

    const paymentLink = await this.paymentService.createPaymentLink(
      orderId,
      order,
      paymentContent,
    );

    return {
      message: 'Payment link created successfully',
      paymentLink,
    };
  }

  @Get('')
  async paymentSuccess(@Query() query: any) {

    const { id } = query;

    const response = await this.paymentService.getPaymentInfo(id);

    return response;
  }

//   @Get('payment-cancel')
//   async paymentCancel(@Query() query: any) {
//     const { code, id, cancel, status, orderCode } = query;

//     // Handle the canceled payment here
//     if (cancel === 'true' || status === 'CANCELLED') {
//       const order = await this.orderDetailRepository.findOne({ where: { id: orderCode } });
//       if (order) {
//         order.status = OrderStatus.FAILURE; // Update the order status
//         await this.orderDetailRepository.save(order);
//         return { message: 'Payment was canceled. Order updated to CANCELLED.' };
//       }
//     }

//     return { message: 'Payment status could not be determined.' };
//   }

}