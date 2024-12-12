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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("./review.entity");
const user_entity_1 = require("../auth/user.entity");
const book_entity_1 = require("../book/entity/book.entity");
const order_detail_entity_1 = require("../order-detail/order-detail.entity");
const enum_1 = require("../order-detail/enum");
const date_fns_1 = require("date-fns");
let ReviewService = class ReviewService {
    constructor(reviewRepository, userRepository, bookRepository, orderDetailRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.orderDetailRepository = orderDetailRepository;
    }
    async getReviewsByBookId(bookId) {
        const reviews = await this.reviewRepository.find({
            where: { book: { id: bookId } },
            relations: ['user', 'book'],
        });
        if (reviews.length === 0) {
            throw new common_1.NotFoundException('No reviews found for this book');
        }
        return reviews.map((review) => ({
            rating: review.rating,
            content: review.content,
            reviewDate: (0, date_fns_1.format)(new Date(review.reviewDate), 'HH:mm dd/MM/yyyy'),
            name: review.user.name,
        }));
    }
    async postReview(bookId, userId, rating, content) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const book = await this.bookRepository.findOne({ where: { id: bookId } });
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        const orderDetail = await this.orderDetailRepository.findOne({
            where: {
                user: { id: userId },
                status: enum_1.OrderStatus.SUCCESS,
            },
        });
        const hasPurchasedBook = orderDetail?.books.some((item) => item.bookId === bookId);
        if (!hasPurchasedBook) {
            return { message: ('You can only review books you have purchased.') };
        }
        const review = this.reviewRepository.create({
            user,
            book,
            rating,
            content,
            reviewDate: new Date(),
        });
        return await this.reviewRepository.save(review);
    }
    async deleteReview(reviewId, userId) {
        const review = await this.reviewRepository.findOne({
            where: { id: reviewId },
            relations: ['user'],
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        if (review.user.id !== userId) {
            throw new common_1.UnauthorizedException('You are not authorized to delete this review');
        }
        await this.reviewRepository.remove(review);
        return { message: 'Review deleted successfully' };
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(3, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=review.service.js.map