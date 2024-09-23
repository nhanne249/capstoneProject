import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegisterDto } from './dto/user-register.dto';
import { userLoginDto } from './dto/user-login.dto';
import { adminLoginDto } from './dto/admin-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('user/register')
  async register(@Body() registerDto: userRegisterDto) {
    try {
      const user = await this.authService.userRegister(registerDto);
      return {
        message: 'Nguoi dung dang ky thanh cong.',
        user: user,
      };
    } catch (error) {
      return {
        message: 'Dang ky that bai.',
        error: error.message || 'Loi khong xac dinh.',
      };
    }
  }

  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: userLoginDto) {
    const { email, password } = loginDto;
    try {
      const user = await this.authService.userValidate(email, password);
      if (!user) {
        return {
          message: 'Dang nhap that bai.',
          error: 'Email hoac mat khau khong dung.'
        };
      }
      return {
        message: 'Nguoi dung dang nhap thanh cong.',
        user: await this.authService.userLogin(user)
      };
    } catch (error) {
      return {
        message: 'Dang nhap that bai.',
        error: error.message || 'Loi khong xac dinh.'
      };
    }
  }

  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async loginAdmin(@Body() adminLoginDto: adminLoginDto) {
    const { username, password } = adminLoginDto;
    try {
      const admin = await this.authService.adminValidate(username, password);
      if (!admin) {
        return {
          message: 'Admin dang nhap that bai.',
          error: 'Username hoac mat khau khong dung.'
        };
      }
      return {
        message: 'Admin dang nhap thanh cong.',
        admin: await this.authService.adminLogin(admin)
      };
    } catch (error) {
      return {
        message: 'Dang nhap that bai.',
        error: error.message || 'Loi khong xac dinh.'
      };
    }
  }
}
