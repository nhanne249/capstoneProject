import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Admin } from './admin.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' }
    }),
    TypeOrmModule.forFeature([User, Admin]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
