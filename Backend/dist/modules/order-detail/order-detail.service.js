"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_detail_entity_1 = require("./order-detail.entity");
const cart_item_entity_1 = require("../cart-item/cart-item.entity");
const book_entity_1 = require("../book/entity/book.entity");
const enum_1 = require("./enum");
let OrderDetailService = class OrderDetailService {
    constructor(orderDetailRepository, cartItemRepository, bookRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.cartItemRepository = cartItemRepository;
        this.bookRepository = bookRepository;
    }
    async createOrder(createOrderDto, userId) {
        const cartItems = await this.cartItemRepository.find({ where: { userId: userId } });
        if (cartItems.length === 0) {
            throw new common_1.NotFoundException('No cart items found for the specified user');
        }
        let defaultStatus;
        if (createOrderDto.paymentMethod === enum_1.PaymentMethod.COD) {
            defaultStatus = enum_1.OrderStatus.PENDING;
        }
        else if (createOrderDto.paymentMethod === enum_1.PaymentMethod.CK) {
            defaultStatus = enum_1.OrderStatus.TRANSFERRING;
        }
        else {
            throw new common_1.BadRequestException('Invalid payment method');
        }
        const order = this.orderDetailRepository.create({
            ...createOrderDto,
            userId: userId,
            status: defaultStatus,
            cartItem: cartItems,
        });
        order.calculateTotalPrice();
        const books = [];
        for (const item of cartItems) {
            const book = await this.bookRepository.findOne({ where: { id: item.bookId } });
            if (!book) {
                throw new common_1.NotFoundException(`Book with ID ${item.bookId} not found`);
            }
            if (book.quantity - item.quantity < 0) {
                throw new common_1.BadRequestException(`Insufficient stock for book with ID ${item.bookId}: Requested ${item.quantity}, Available ${book.quantity}`);
            }
            book.quantity -= item.quantity;
            await this.bookRepository.save(book);
            books.push({
                bookId: item.bookId,
                quantity: item.quantity,
            });
        }
        order.books = books;
        const savedOrder = await this.orderDetailRepository.save(order);
        await this.cartItemRepository.delete({ userId: userId });
        const transformedCartItems = cartItems.map(item => ({
            title: item.book.title,
            quantity: item.quantity,
            price: item.sellingPrice,
        }));
        const data = {
            paymentMethod: savedOrder.paymentMethod,
            rAddress: savedOrder.rAddress,
            rName: savedOrder.rName,
            rPhone: savedOrder.rPhone,
            status: savedOrder.status,
            totalPrice: savedOrder.totalPrice,
            orderDate: savedOrder.orderDate,
            cartItem: transformedCartItems,
        };
        return data;
    }
    async getOrderById(id, userId) {
        const order = await this.orderDetailRepository.findOne({
            where: { id, userId },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const books = [];
        for (const el of order.books) {
            const book = await this.bookRepository.findOne({
                where: { id: Number(el.bookId) },
                select: ['title', 'sellingPrice', 'image_id'],
            });
            if (book) {
                books.push({
                    ...book,
                    quantity: el.quantity,
                });
            }
            else {
                console.log(`Book with id ${id} not found`);
            }
        }
        return {
            paymentMethod: order.paymentMethod,
            rAddress: order.rAddress,
            rName: order.rName,
            rPhone: order.rPhone,
            status: order.status,
            totalPrice: order.totalPrice,
            orderDate: order.orderDate,
            cartItem: books,
        };
    }
    async getAllOrders(userId) {
        const orders = await this.orderDetailRepository.find({
            where: { userId },
        });
        return await Promise.all(orders.map(async (order) => {
            const books = [];
            for (const el of order.books) {
                const book = await this.bookRepository.findOne({
                    where: { id: Number(el.bookId) },
                    select: ['title', 'sellingPrice', 'image_id'],
                });
                if (book) {
                    books.push({
                        ...book,
                        quantity: el.quantity,
                    });
                }
                else {
                    console.log(`Book with id ${el.bookId} not found`);
                }
            }
            return {
                id: order.id,
                paymentMethod: order.paymentMethod,
                rAddress: order.rAddress,
                rName: order.rName,
                rPhone: order.rPhone,
                status: order.status,
                totalPrice: order.totalPrice,
                orderDate: order.orderDate,
                books: books,
            };
        }));
    }
    async getAllOrdersByAdmin(page) {
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        const [orders, total] = await this.orderDetailRepository.findAndCount({
            relations: ['user'],
            skip: offset,
            take: pageSize,
            order: {
                id: 'DESC',
            },
        });
        console.log(orders);
        return {
            data: await Promise.all(orders.map(async (order) => {
                const books = [];
                for (const el of order.books) {
                    const book = await this.bookRepository.findOne({
                        where: { id: Number(el.bookId) },
                        select: ['title', 'sellingPrice', 'image_id'],
                    });
                    if (book) {
                        books.push({
                            ...book,
                            quantity: el.quantity,
                        });
                    }
                    else {
                        console.log(`Book with id ${el.bookId} not found`);
                    }
                }
                return {
                    id: order.id,
                    paymentMethod: order.paymentMethod,
                    rAddress: order.rAddress,
                    rName: order.rName,
                    rPhone: order.rPhone,
                    status: order.status,
                    totalPrice: order.totalPrice,
                    orderDate: order.orderDate,
                    cartItem: books,
                };
            })),
            pageNumber: page,
            pageSize: pageSize,
            total: total,
        };
    }
    async updateOrder(id, updateOrderDto, userId) {
        const order = await this.orderDetailRepository.findOne({
            where: { id, userId },
            relations: ['cartItem'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const fieldsToUpdate = {};
        if (updateOrderDto.status !== undefined) {
            fieldsToUpdate.status = updateOrderDto.status;
        }
        if (updateOrderDto.paymentMethod !== undefined) {
            fieldsToUpdate.paymentMethod = updateOrderDto.paymentMethod;
        }
        if (updateOrderDto.rAddress !== undefined) {
            fieldsToUpdate.rAddress = updateOrderDto.rAddress;
        }
        if (updateOrderDto.rName !== undefined) {
            fieldsToUpdate.rName = updateOrderDto.rName;
        }
        if (updateOrderDto.rPhone !== undefined) {
            fieldsToUpdate.rPhone = updateOrderDto.rPhone;
        }
        if (updateOrderDto.books !== undefined) {
            fieldsToUpdate.books = updateOrderDto.books.map((book) => ({
                bookId: book.bookId,
                quantity: book.quantity,
            }));
        }
        this.orderDetailRepository.merge(order, fieldsToUpdate);
        if (order.cartItem && order.cartItem.length > 0) {
            order.calculateTotalPrice();
        }
        return await this.orderDetailRepository.save(order);
    }
    async deleteOrder(id, userId) {
        const order = await this.getOrderById(id, userId);
        if (!order) {
            return {
                message: ('Order not found or you are not authorized to delete this order')
            };
        }
        const result = await this.orderDetailRepository.delete({ id });
        if (result.affected === 0) {
            throw new common_1.InternalServerErrorException('Failed to delete the order');
        }
        return { message: 'Order deleted successfully' };
    }
    async getRevenueByMonth(year, month) {
        try {
            const result = await this.orderDetailRepository
                .createQueryBuilder('order')
                .where('YEAR(order.orderDate) = :year', { year })
                .andWhere('MONTH(order.orderDate) = :month', { month })
                .andWhere('order.status = :status', { status: enum_1.OrderStatus.SUCCESS })
                .select('SUM(order.totalPrice)', 'totalRevenue')
                .getRawOne();
            return {
                month,
                year,
                totalRevenue: result?.totalRevenue ?? 0,
            };
        }
        catch (error) {
            console.error('Error calculating revenue:', error.message);
            throw new Error('Failed to calculate revenue.');
        }
    }
    async getTotalQuantitySoldByMonth(year, month) {
        try {
            const orders = await this.orderDetailRepository
                .createQueryBuilder('order')
                .where('YEAR(order.orderDate) = :year', { year })
                .andWhere('MONTH(order.orderDate) = :month', { month })
                .andWhere('order.status = :status', { status: enum_1.OrderStatus.SUCCESS })
                .select(['order.books'])
                .getMany();
            const totalQuantitySold = orders.reduce((total, order) => {
                if (order.books && Array.isArray(order.books)) {
                    const orderQuantity = order.books.reduce((sum, book) => sum + (book.quantity || 0), 0);
                    return total + orderQuantity;
                }
                return total;
            }, 0);
            return {
                month,
                year,
                totalQuantitySold,
            };
        }
        catch (error) {
            console.error('Error calculating total quantity sold:', error.message);
            throw new Error('Failed to calculate total quantity sold.');
        }
    }
};
exports.OrderDetailService = OrderDetailService;
exports.OrderDetailService = OrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __param(2, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderDetailService);
//# sourceMappingURL=order-detail.service.js.map