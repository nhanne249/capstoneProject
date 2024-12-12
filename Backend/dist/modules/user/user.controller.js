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
exports.AdminController = exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_guard_1 = require("../auth/auth.guard");
const user_service_1 = require("./user.service");
const user_entity_1 = require("../auth/user.entity");
const user_dto_1 = require("./dto/user.dto");
const bcrypt = require("bcryptjs");
const Roles = (...role) => (0, common_1.SetMetadata)('role', role);
let UserController = class UserController {
    constructor(userRepository, userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }
    async getUser(request) {
        try {
            const userPayload = request['user'];
            const username = userPayload.username;
            const foundUser = await this.userService.getUser(username);
            if (!foundUser) {
                return { message: 'User not found.' };
            }
            return {
                message: 'User retrieved successfully',
                data: foundUser
            };
        }
        catch (error) {
            return {
                message: 'Failed to retrieve user information.',
                error: error.message,
            };
        }
    }
    async updateUser(request, updateUserDto) {
        try {
            const userPayload = request['user'];
            const username = userPayload.username;
            const foundUser = await this.userService.getUser(username);
            if (!foundUser) {
                return 'Username does not exist.';
            }
            if (updateUserDto.email) {
                const existingEmailUser = await this.userRepository.findOne({ where: { email: updateUserDto.email } });
                if (existingEmailUser && existingEmailUser.username !== username) {
                    return 'Email already exists.';
                }
            }
            if (updateUserDto.phone) {
                const existingPhoneUser = await this.userRepository.findOne({ where: { phone: updateUserDto.phone } });
                if (existingPhoneUser && existingPhoneUser.username !== username) {
                    return 'Phone number already exists.';
                }
            }
            if (updateUserDto.password) {
                const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
                updateUserDto.password = hashedPassword;
            }
            else {
                delete updateUserDto.password;
            }
            await this.userService.updateUser(username, updateUserDto);
            return { message: 'User updated successfully' };
        }
        catch (error) {
            return {
                message: 'Update user failed',
                error: error.message,
            };
        }
    }
    async deleteUser(request) {
        try {
            const userPayload = request['user'];
            const username = userPayload.username;
            const deletedUser = await this.userService.getUser(username);
            if (!deletedUser) {
                return 'Username does not exist.';
            }
            await this.userService.deleteUserbyId(deletedUser.id);
            return {
                message: 'User deleted successfully.',
                data: deletedUser,
            };
        }
        catch (error) {
            return {
                message: 'Delete user failed',
                error: error.message,
            };
        }
    }
};
exports.UserController = UserController;
__decorate([
    Roles('User'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    Roles('User'),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    Roles('User'),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    (0, common_1.Controller)('api/user'),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], UserController);
let AdminController = class AdminController {
    constructor(adminService, userService) {
        this.adminService = adminService;
        this.userService = userService;
    }
    async getAllUserByAdmin(page) {
        const pageNumber = page ? parseInt(page, 10) : 1;
        return this.adminService.getAllUserByAdmin(pageNumber);
    }
    async getUserByAdmin(username) {
        try {
            const foundUser = await this.userService.getUser(username);
            if (!foundUser)
                return 'Username does not exist.';
            return foundUser;
        }
        catch (error) {
            return {
                message: 'Find user fail.',
                error: error.message,
            };
        }
    }
    async deleteUserByAdmin(username) {
        try {
            const deletedUser = await this.userService.getUser(username);
            if (!deletedUser) {
                return 'Username does not exist.';
            }
            await this.userService.deleteUserbyId(deletedUser.id);
            return {
                message: 'User deleted successfully.',
                data: deletedUser,
            };
        }
        catch (error) {
            return {
                message: 'Delete user failed',
                error: error.message,
            };
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    Roles('Admin'),
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUserByAdmin", null);
__decorate([
    Roles('Admin'),
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserByAdmin", null);
__decorate([
    Roles('Admin'),
    (0, common_1.Delete)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUserByAdmin", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_guard_1.RolesGuard),
    (0, common_1.Controller)('api/admin'),
    __metadata("design:paramtypes", [user_service_1.AdminService,
        user_service_1.UserService])
], AdminController);
//# sourceMappingURL=user.controller.js.map