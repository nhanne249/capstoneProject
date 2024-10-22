import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'email', 'phone', 'name'],
    });
  }

  async updateUser(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUser(username);
    if (!user) {
      throw new Error('User not found');
    }
    const newUser = Object.assign(user, updateUserDto);
    await this.deleteUserbyId(user.id)
    return await this.userRepository.save(newUser);
  }

  async deleteUserbyId(id: number) {
    return await this.userRepository.delete(id);
  }
}

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllUserByAdmin(page: number): Promise<User[]> {
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    return this.userRepository.find({
      skip: offset,
      take: pageSize,
      select: ['id', 'username', 'email', 'phone', 'name', 'role'],
    });
  }
}