import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { UserDto } from './dto/user.dto';
import { PaginationResponse } from 'src/pagination.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUser(username: string): Promise<User>;
    updateUser(username: string, updateUserDto: UserDto): Promise<User>;
    deleteUserbyId(id: number): Promise<import("typeorm").DeleteResult>;
}
export declare class AdminService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getAllUserByAdmin(page: number): Promise<PaginationResponse<User>>;
}
