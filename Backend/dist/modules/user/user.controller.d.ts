import { Repository } from 'typeorm';
import { UserService, AdminService } from './user.service';
import { User } from '../auth/user.entity';
import { UserDto } from './dto/user.dto';
export declare class UserController {
    private userRepository;
    private readonly userService;
    constructor(userRepository: Repository<User>, userService: UserService);
    getUser(request: Request): Promise<{
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        message: string;
        data: User;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    updateUser(request: Request, updateUserDto: UserDto): Promise<"Username does not exist." | "Email already exists." | "Phone number already exists." | {
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    deleteUser(request: Request): Promise<"Username does not exist." | {
        message: string;
        data: User;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
}
export declare class AdminController {
    private readonly adminService;
    private readonly userService;
    constructor(adminService: AdminService, userService: UserService);
    getAllUserByAdmin(page: string): Promise<import("../../pagination.dto").PaginationResponse<User>>;
    getUserByAdmin(username: string): Promise<User | "Username does not exist." | {
        message: string;
        error: any;
    }>;
    deleteUserByAdmin(username: string): Promise<"Username does not exist." | {
        message: string;
        data: User;
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
}
