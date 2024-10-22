/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userSignupDto } from './dto/user-signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signup(@Body() signupDto: userSignupDto) {
    try {
      await this.authService.userSignup(signupDto)
      return {
        message: 'Sign up successfully!',
      };
    } catch (error) {
      return {
        message: 'Sign up failed!',
        error: error.message,
      };
    }
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() SigninDto: SigninDto) {
    const { username, password } = SigninDto;

    try {
      const user = await this.authService.loginValidate(username, password);

      if (!user) {
        return {
          message: 'Sign in failed!',
          error: 'Incorrect username or password!',
        };
      }

      return {
        message: `Sign in Successfully!`,
        username: user.username,
        role: user.role,
        token: await this.authService.login(user),
      };
    } catch (error) {
      return {
        message: 'Sign in failed!',
        error: error.message || 'Unspecified error!',
      };
    }
  }
}
