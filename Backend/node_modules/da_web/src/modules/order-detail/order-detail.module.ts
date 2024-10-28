import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-detail.controller';

@Module({
  controllers: [OrderDetailController]
})
export class OrderDetailModule {}
