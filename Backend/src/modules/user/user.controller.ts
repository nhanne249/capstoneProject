import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query, SetMetadata, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard, RolesGuard } from '../auth/auth.guard';
/* eslint-disable prettier/prettier */
import { UserService, AdminService } from './user.service';
import { User } from '../auth/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Controller('api/user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userService: UserService
  ) { }

  @UseGuards(AuthGuard)
  @Get()
  async getUser(@Req() request: Request) {
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
      }
    } catch (error) {
      return {
        message: 'Failed to retrieve user information.',
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateUser(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const userPayload = request['user'];
      const username = userPayload.username;

      const foundUser = await this.userService.getUser(username);
      if (!foundUser) {
        return 'Username does not exist.'
      }
      if (updateUserDto.email) {
        const existingEmailUser = await this.userRepository.findOne({ where: { email: updateUserDto.email } });
        if (existingEmailUser && existingEmailUser.username !== username) {
          return 'Email already exists.'
        }
      }
      if (updateUserDto.phone) {
        const existingPhoneUser = await this.userRepository.findOne({ where: { phone: updateUserDto.phone } });
        if (existingPhoneUser && existingPhoneUser.username !== username) {
          return 'Phone number already exists.'
        }
      }
      if (updateUserDto.password) {
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        updateUserDto.password = hashedPassword;
      } else {
        delete updateUserDto.password;
      }
      await this.userService.updateUser(username, updateUserDto);
      return { message: 'User updated successfully'};
    } catch (error) {
      return {
        message: 'Update user failed',
        error: error.message,
      }
    }
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@Req() request: Request) {
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
      }
    }
    catch (error) {
      return {
        message: 'Delete user failed',
        error: error.message,
      }
    }
  }
}

export const Roles = (...role: string[]) => SetMetadata('role', role);

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) { }

  @Roles('admin')
  @Get('users')
  async getAllUserByAdmin(@Query('page') page: string) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    return this.adminService.getAllUserByAdmin(pageNumber);
  }

  @Roles('admin')
  @Get(':username')
  async getUserByAdmin(@Param('username') username: string) {
    try {
      const foundUser = await this.userService.getUser(username);
      if (!foundUser) return 'Username does not exist.'
      return foundUser;
    } catch (error) {
      return {
        message: 'Find user fail.',
        error: error.message,
      }
    }
  }

  @Roles('admin')
  @Delete(':username')
  async deleteUserByAdmin(@Param('username') username: string) {
    try {
      const deletedUser = await this.userService.getUser(username);
      if (!deletedUser) {
        return 'Username does not exist.';
      }
      await this.userService.deleteUserbyId(deletedUser.id);
      return {
        message: 'User deleted successfully.',
        data: deletedUser,
      }
    }
    catch (error) {
      return {
        message: 'Delete user failed',
        error: error.message,
      }
    }
  }
}