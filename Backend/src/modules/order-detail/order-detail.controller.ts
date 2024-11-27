/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Req, Param, UseGuards, Put, Delete, SetMetadata, Query } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard, RolesGuard } from '../auth/auth.guard'

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
    
    @Roles('Admin')
    @Get('admin')
    async getAllOrdersByAdmin(@Query('page') page: string) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const orders = await this.orderDetailService.getAllOrdersByAdmin(pageNumber);
            return {
                message: "Retrieve all orders by Admin successfully",
                data: orders,
            };
        } catch (error) {
            return {
                message: "Failed to retrieve all orders by Admin.",
                error: error.message,
            };
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
                message: "Retrieve all orders successfully",
                data: orders,
            };
        } catch (error) {
            return {
                message: "Failed to retrieve all orders.",
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

    @Post('revenue')
    async getRevenueByMonth(@Body() body: { year: number, month: number }, @Req() request: Request) {
        const { year, month } = body;
        return this.orderDetailService.getRevenueByMonth(year, month);
    }

    @Post('quantity-sold')
    async getTotalQuantitySoldByMonth(@Body() body: { year: number, month: number }) {
        const { year, month } = body;
        return this.orderDetailService.getTotalQuantitySoldByMonth(year, month);
    }

}
