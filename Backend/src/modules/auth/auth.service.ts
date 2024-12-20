/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { userSignupDto } from './dto/user-signup.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private jwtService: JwtService
    ) { }

    // User signup
    async userSignup(signupDto: userSignupDto): Promise<User> {
        
        const { username, password, name, email, phone } = signupDto;
        const foundUser = await this.userRepository.findOne({ where: { username } });
        if (foundUser) {
            throw new Error('Username already exists');
        }
        const foundEmail = await this.userRepository.findOne({ where: { email } });
        if (foundEmail) {
            throw new Error('Email already exists');
        }
        const foundPhoneNumber = await this.userRepository.findOne({ where: { phone } });
        if (foundPhoneNumber) {
            throw new Error('Phone number already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with all the necessary fields
        const newUser = this.userRepository.create({
            
            username,
            password: hashedPassword,
            name,
            email,
            phone
            // ,role
        });

        // Save the new user to the database
        return this.userRepository.save(newUser);
    }

    // Validate User for login
    async loginValidate(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    // User login
    async login(user: User) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return this.jwtService.sign(payload);
    }


}
