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
exports.ImageController = exports.BooksController = exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const book_service_2 = require("./book.service");
const update_book_dto_1 = require("./dto/update-book.dto");
const create_book_dto_1 = require("./dto/create-book.dto");
const auth_guard_1 = require("../auth/auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const Roles = (...role) => (0, common_1.SetMetadata)('role', role);
let BookController = class BookController {
    constructor(bookService, imageService) {
        this.bookService = bookService;
        this.imageService = imageService;
    }
    async getBookByAdmin(bookId) {
        const book = await this.bookService.getBookById(bookId);
        if (!book) {
            return { message: 'Book not found' };
        }
        return { message: 'Book retrieved successfully', data: book };
    }
    async getBookByUser(bookId) {
        const book = await this.bookService.getBookById(bookId);
        if (!book) {
            return { message: 'Book not found' };
        }
        const { title, author, sellingPrice, description, quantity, image_id } = book;
        return {
            message: 'Book retrieved successfully',
            data: {
                image_id,
                title,
                author,
                sellingPrice,
                description, quantity
            }
        };
    }
    async updateBook(bookId, updateBookDto) {
        try {
            const updatedBook = await this.bookService.getBookById(bookId);
            if (!updatedBook) {
                return { message: 'Book not found', data: null };
            }
            const result = await this.bookService.updateBook(updateBookDto, bookId);
            if (updateBookDto.image_id) {
                await this.imageService.updateImage(bookId, updateBookDto.image_id);
            }
            return { message: 'Book updated successfully', data: result };
        }
        catch (e) {
            return {
                message: 'Error updating book',
                error: e
            };
        }
    }
    async deleteBook(bookId) {
        try {
            const deletedBook = await this.bookService.deleteBook(bookId);
            if (!deletedBook) {
                return { message: 'Book not found or deletion failed' };
            }
            return { message: 'Book deleted successfully' };
        }
        catch (e) {
            return {
                message: 'Error delete book',
                error: e.message,
            };
        }
    }
    async addBook(createBookDto) {
        try {
            const existingBook = await this.bookService.getBookByTitle(createBookDto.title);
            if (existingBook) {
                return {
                    message: 'Book already exists',
                };
            }
            return this.bookService.addBook(createBookDto);
        }
        catch {
            return {
                message: 'Error adding book',
            };
        }
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    Roles('Admin'),
    (0, common_1.Get)(':bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBookByAdmin", null);
__decorate([
    (0, common_1.Get)('/public/:bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBookByUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    Roles('Admin'),
    (0, common_1.Put)(':bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    Roles('Admin'),
    (0, common_1.Delete)(':bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    Roles('Admin'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "addBook", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('api/book'),
    __metadata("design:paramtypes", [book_service_1.BookService,
        book_service_2.ImageService])
], BookController);
let BooksController = class BooksController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async getAllBooks(page) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const books = await this.bookService.getAllBooks(pageNumber);
            return {
                message: 'Find all books successfully',
                response: books,
            };
        }
        catch (error) {
            return {
                message: 'Error get all books',
                error: error.message,
            };
        }
    }
    async getAllBooksByUser(page) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const books = await this.bookService.getAllBooks(pageNumber);
            const transformedBooks = books.data.map(book => ({
                id: book.id,
                title: book.title,
                author: book.author,
                sellingPrice: book.sellingPrice,
                description: book.description,
                image_id: book.image_id,
            }));
            return {
                message: 'Find all books successfully',
                response: {
                    data: transformedBooks,
                    pageNumber: books.pageNumber,
                    pageSize: books.pageSize,
                    total: books.total,
                    totalPages: books.totalPages,
                    hasNextPage: books.hasNextPage,
                    hasPreviousPage: books.hasPreviousPage
                }
            };
        }
        catch (error) {
            return {
                message: 'Error get all books',
                error: error.message,
            };
        }
    }
    async searchBook(search, page) {
        try {
            const pageNumber = page ? parseInt(page, 10) : 1;
            const books = await this.bookService.searchBooks(search, pageNumber);
            return {
                message: 'Search books successfully',
                data: books,
            };
        }
        catch (error) {
            return {
                message: 'Error search books',
                error: error.message,
            };
        }
    }
    async sortByPrice(order = 'asc', page) {
        const pageNumber = page ? parseInt(page, 10) : 1;
        return this.bookService.sortBooksByPrice(order, pageNumber);
    }
    getNewestBook() {
        return this.bookService.getNewestBooks();
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    Roles('Admin'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)('/public'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getAllBooksByUser", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "searchBook", null);
__decorate([
    (0, common_1.Get)('sort'),
    __param(0, (0, common_1.Query)('order')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "sortByPrice", null);
__decorate([
    (0, common_1.Get)("newest"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getNewestBook", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)('api/books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BooksController);
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async uploadImage(file) {
        const savedImage = await this.imageService.saveImageFile(file);
        return {
            message: 'Upload image successfully.',
            image_id: savedImage.id,
        };
    }
    async getImageById(id, res) {
        const image = await this.imageService.getImageById(id);
        res.set({
            'Content-Type': image.mimeType,
            'Content-Disposition': `inline; filename="${image.fileName}"`,
        });
        res.send(image.image);
    }
    async deleteImage(id) {
        try {
            const result = await this.imageService.deleteImage(id);
            return result;
        }
        catch (error) {
            return {
                message: error.message || 'An error occurred while deleting the image',
                data: null,
            };
        }
    }
};
exports.ImageController = ImageController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    Roles('Admin'),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getImageById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "deleteImage", null);
exports.ImageController = ImageController = __decorate([
    (0, common_1.Controller)('api/image'),
    __metadata("design:paramtypes", [book_service_2.ImageService])
], ImageController);
//# sourceMappingURL=book.controller.js.map