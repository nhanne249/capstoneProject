/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Req, Param, UseGuards, Put, Delete, SetMetadata } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard, RolesGuard } from '../auth/auth.guard';
import { OrderDetail } from './order-detail.entity';
import { log } from 'console';
import { Role } from '../auth/enums/role.enum';

const Roles = (...role: string[]) => SetMetadata('role', role);

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/order')
export class OrderDetailController {
    constructor(private readonly orderDetailService: OrderDetailService) { }

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() request: Request) {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            console.log(userId)
            return {
                message: "Create order succesfully",
                data: this.orderDetailService.createOrder(createOrderDto, userId)
            }
        } catch (error) {
            return {
                message: "Create order failed.",
                error: error.message
            }
        }
    }

    @Get(':id')
    async getOrderById(@Param('id') id: number, @Req() request: Request): Promise<any> {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            const order = await this.orderDetailService.getOrderById(id, userId);

            return {
                message: "Order retrieved successfully",
                data: order,
            };
        } catch (error) {
            return {
                message: "Failed to retrieve order.",
                error: error.message,
            };
        }
    }

    @Get()
    async getAllOrders(@Req() request: Request): Promise<any> {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            const orders = await this.orderDetailService.getAllOrders(userId);

            return {
                message: "Orders retrieved successfully",
                data: orders,
            };
        } catch (error) {
            return {
                message: "Failed to retrieve orders.",
                error: error.message,
            };
        }
    }

    @Roles('Admin')
    @Put(':id')
    async updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto, @Req() request: Request): Promise<any> {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            const updatedOrder = await this.orderDetailService.updateOrder(id, updateOrderDto, userId);

            return {
                message: "Order updated successfully",
                data: updatedOrder,
            };
        } catch (error) {
            return {
                message: "Failed to update order.",
                error: error.message,
            };
        }
    }

    @Roles('Admin')
    @Delete(':id')
    async deleteOrder(@Param('id') id: number, @Req() request: Request): Promise<any> {
        try {
            const userPayload = request['user'];
            const userId = userPayload.sub;
            await this.orderDetailService.deleteOrder(id, userId);

            return {
                message: "Order deleted successfully",
            };
        } catch (error) {
            return {
                message: "Failed to delete order.",
                error: error.message,
            };
        }
    }
}
