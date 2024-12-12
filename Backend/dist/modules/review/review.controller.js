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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const post_review_dto_1 = require("./dto/post-review.dto");
const auth_guard_1 = require("../auth/auth.guard");
const Roles = (...role) => (0, common_1.SetMetadata)('role', role);
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async getReviewByBookId(bookId) {
        return this.reviewService.getReviewsByBookId(bookId);
    }
    async postReview(postReview, request) {
        const userPayload = request['user'];
        const userId = userPayload.sub;
        return this.reviewService.postReview(postReview.bookId, userId, postReview.rating, postReview.content);
    }
    async deleteReview(reviewId, request) {
        const userPayload = request['user'];
        const userId = userPayload.sub;
        return this.reviewService.deleteReview(reviewId, userId);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Get)(':bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewByBookId", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_review_dto_1.postReview, Request]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "postReview", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    (0, common_1.Delete)(':reviewId'),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Request]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('api/review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map