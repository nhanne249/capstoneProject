import { AuthService } from './auth.service';
import { userSignupDto } from './dto/user-signup.dto';
import { SigninDto } from './dto/signin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(signupDto: userSignupDto): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    login(SigninDto: SigninDto): Promise<{
        message: string;
        username: string;
        role: import("./enums/role.enum").Role;
        token: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
        username?: undefined;
        role?: undefined;
        token?: undefined;
    }>;
}
