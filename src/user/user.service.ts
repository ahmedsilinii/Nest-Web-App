import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

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

    async login (credentials: LoginCredentialsDto): Promise<Partial<UserEntity>> {
        const {username,password} = credentials;

        const user = await this.userRepository.createQueryBuilder('user') 
        .where("user.username = :username or user.password = :username", {username})
        .getOne();

        if (!user){
            throw new NotFoundException('User or password not found');
        }

        const hashedPassword = await bcrypt.hash(password, user.salt);
        if (hashedPassword === user.password){
            return {
                username,
                email: user.email,
                role: user.role
            };
        } else {
            throw new NotFoundException('User or password not found');
        }
    }
}
