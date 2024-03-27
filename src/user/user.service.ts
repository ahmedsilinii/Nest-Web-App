import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async register (userData: UserSubscribeDto) : Promise<Partial<UserEntity>>{
        const user = this.userRepository.create({
            ...userData
        });
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        try{
            await this.userRepository.save(user);  
        } catch (error){
            throw new ConflictException('Username and email must be unique');
        }

        return {
            id:user.id,
            username: user.username,
            email: user.email,
            password: user.password
        };
    }
}
