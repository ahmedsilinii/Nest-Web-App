import { ConflictException, Injectable } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private userRepository: Repository<UserEntity>
    ) {}

    async register (userData: UserSubscribeDto) : Promise<UserEntity>{
        const user = this.userRepository.create({
            ...userData
        });
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        try{
            await this.userRepository.save(user);  
        } catch (error){
            throw new ConflictException('Username or email already exists');
        }

        return user;
    }
}
