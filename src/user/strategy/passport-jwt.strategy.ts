import { PassportStrategy,  } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt,Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from '../interfaces/payload-interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository : Repository<UserEntity>
  )
    {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get('SECRET')
    });
  }

    async validate(payload: PayloadInterface) {
        const user = await this.userRepository.findOne({
            where: { username: payload.username }
        });

        if(user){
            const {password, salt, ...result} = user;
            return result;
        }else{
            throw new UnauthorizedException();
        }
    }
}