/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { UserService, AdminService } from './user.service';
import { User } from '../auth/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('api/user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userService: UserService
  ) { }

  @Get(':username')
  async getUser(@Param('username') username: string) {
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

  @Put(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
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
        const existingEmailUser = await this.userRepository.findOne({ where: { phone: updateUserDto.phone } });
        if (existingEmailUser && existingEmailUser.username !== username) {
          return 'Phone number already exists.'
        }
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

  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
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

@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) { }

  @Get('users')
  async getAllUser(@Query('page') page: string) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    return this.adminService.getAllUserByAdmin(pageNumber);
  }

  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
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