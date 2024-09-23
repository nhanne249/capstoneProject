import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/auth/user.entity';
import { Admin } from './modules/auth/admin.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost', // 'localhost',
    port: 3306,
    username: 'root', // 'root',
    password: 'Phat_07042004', // 'Phat_07042004',
    database: 'mydb1', // 'mydb1',
    entities: [User, Admin],
    synchronize: true,
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
