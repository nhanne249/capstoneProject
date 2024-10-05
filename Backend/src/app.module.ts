/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/auth/user.entity';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-1563abc0-daweb.d.aivencloud.com', // 'localhost',
    port: 22337,
    username: 'avnadmin', // 'root',
    password: 'AVNS_Rb6CTJ22C4e_O8CDMSz', // 'Phat_07042004',
    database: 'defaultdb', // 'mydb1',
    entities: [User],
    synchronize: true,
  }), AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
