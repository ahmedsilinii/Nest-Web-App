import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { User } from 'src/decorators/user-decorator';

dotenv.config();
@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '1d'
      }
    }),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports:[UserService]
})
export class UserModule {}
