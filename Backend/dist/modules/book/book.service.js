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
exports.ImageService = exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./entity/book.entity");
const image_entity_1 = require("./entity/image.entity");
let BookService = class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async getBookByTitle(title) {
        return this.bookRepository.findOne({ where: { title: title } });
    }
    async getBookById(bookId) {
        return this.bookRepository.findOne({ where: { id: bookId } });
    }
    async getAllBooks(page) {
        const pageSize = 12;
        const offset = (page - 1) * pageSize;
        const [books, total] = await this.bookRepository.findAndCount({
            skip: offset,
            take: pageSize,
        });
        const totalPages = Math.ceil(total / pageSize);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        return {
            data: books,
            pageNumber: page,
            pageSize: pageSize,
            total: total,
            totalPages: totalPages,
            hasNextPage: hasNextPage,
            hasPreviousPage: hasPreviousPage,
        };
    }
    async deleteBook(bookId) {
        return await this.bookRepository.delete(bookId);
    }
    async updateBook(updateBookDto, bookId) {
        const book = await this.bookRepository.findOne({ where: { id: bookId } });
        const updatedBook = this.bookRepository.merge(book, updateBookDto);
        return this.bookRepository.save(updatedBook);
    }
    async addBook(createBookDto) {
        const newBook = this.bookRepository.create(createBookDto);
        return this.bookRepository.save(newBook);
    }
    async searchBooks(search, page) {
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        const [books, total] = await this.bookRepository.findAndCount({
            where: [
                { title: (0, typeorm_2.ILike)(`%${search}%`) },
                { author: (0, typeorm_2.ILike)(`%${search}%`) },
                { description: (0, typeorm_2.ILike)(`%${search}%`) }
            ],
            select: ['title', 'quantity', 'author', 'description', 'costPrice', 'sellingPrice'],
            skip: offset,
            take: pageSize,
        });
        return {
            data: books.map(book => ({
                image: book.image.map((item) => item.toString()),
                title: book.title,
                author: book.author,
                description: book.description,
                sellingPrice: book.sellingPrice
            })),
            pageNumber: page,
            pageSize: pageSize,
            total: total,
        };
    }
    async sortBooksByPrice(order, page) {
        const pageSize = 10;
        const offset = (page - 1) * pageSize;
        const [books, total] = await this.bookRepository.findAndCount({
            order: {
                sellingPrice: order === 'asc' ? 'ASC' : 'DESC',
            },
            skip: offset,
            take: pageSize,
        });
        return {
            data: books.map(book => ({
                image: book.image.map((item) => item.toString()),
                title: book.title,
                author: book.author,
                description: book.description,
                sellingPrice: book.sellingPrice,
            })),
            pageNumber: page,
            pageSize: pageSize,
            total: total,
        };
    }
    async getNewestBooks() {
        const books = await this.bookRepository.find({
            order: { id: 'DESC' },
            take: 4,
        });
        return books;
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookService);
let ImageService = class ImageService {
    constructor(imageRepository, bookRepository) {
        this.imageRepository = imageRepository;
        this.bookRepository = bookRepository;
    }
    async saveImageFile(file) {
        const imageEntity = this.imageRepository.create({
            image: file.buffer,
            mimeType: file.mimetype,
            fileName: file.originalname,
            size: file.size,
        });
        return await this.imageRepository.save(imageEntity);
    }
    async getImageById(id) {
        const image = await this.imageRepository.findOne({ where: { id } });
        if (!image) {
            throw new common_1.HttpException('Image not found', common_1.HttpStatus.NOT_FOUND);
        }
        return image;
    }
    async updateImage(bookId, imageIds) {
        await this.imageRepository.update({ bookId: bookId }, { bookId: null });
        const updatedImages = [];
        for (const id of imageIds) {
            const image = await this.imageRepository.findOne({ where: { id } });
            if (image) {
                image.bookId = bookId;
                const updatedImage = await this.imageRepository.save(image);
                updatedImages.push(updatedImage);
            }
            else {
                console.log(`Image with id ${id} not found`);
            }
        }
        return {
            message: 'Images updated successfully',
            data: updatedImages,
        };
    }
    async deleteImage(id) {
        const image = await this.imageRepository.findOne({ where: { id } });
        if (!image) {
            throw new common_1.HttpException('Image not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.imageRepository.remove(image);
        return {
            message: 'Image deleted successfully',
            data: { id },
        };
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __param(1, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ImageService);
//# sourceMappingURL=book.service.js.map