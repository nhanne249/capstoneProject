import { Injectable } from '@nestjs/common';
import { userLoginDto } from './dto/user-login.dto';
import { userRegisterDto } from './dto/user-register.dto';
import { adminLoginDto } from './dto/admin-login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        
        private jwtService: JwtService
    ) { }

    // User register
    async userRegister(registerDto: userRegisterDto): Promise<User> {
        const { email, password, first_name, last_name, address, zip_code, phone_number } = registerDto;

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with all the necessary fields
        const newUser = this.userRepository.create({
            email,
            password: password,
            first_name,
            last_name,
            address,
            zip_code,
            phone_number,
        });

        // Save the new user to the database
        return this.userRepository.save(newUser);
    }

    // Validate User for login
    async userValidate(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        // if (user && (await bcrypt.compare(password, user.password))) {
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    // User login
    async userLogin(user: User) {
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload);
    }

    // Validate Admin for login
    async adminValidate(username: string, password: string): Promise<Admin> {
        const admin = await this.adminRepository.findOne({ where: { username } });
        // if (!admin) {
        //     const newadmin = this.adminRepository.create({ username, password });
        //     await this.adminRepository.save(newadmin);
        //     console.log('New admin created:', newadmin);
        //     return newadmin;  // Return the newly created admin
        // }
        if (admin && admin.password === password) {
            return admin;
        }
        return null;
    }

    // Login Admin
    async adminLogin(admin: Admin) {
        const payload = { username: admin.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
