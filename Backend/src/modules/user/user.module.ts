import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdminService, UserService } from './user.service';
import { AdminController, UserController } from './user.controller';
import { User } from '../auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    })],
  providers: [UserService, AdminService],
  controllers: [UserController, AdminController],
})
export class UsersModule {}