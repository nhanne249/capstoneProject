import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService, UserService } from './user.service';
import { AdminController, UserController } from './user.controller';
import { User } from '../auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, AdminService],
  controllers: [UserController, AdminController],
})
export class UsersModule {}