import { userSignupDto } from './dto/user-signup.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    userSignup(signupDto: userSignupDto): Promise<User>;
    loginValidate(username: string, password: string): Promise<User>;
    login(user: User): Promise<string>;
}
