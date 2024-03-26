import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CvEntity from './entities/cv.entity/cv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvService {
    constructor (
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    ) {}   
    
    async getCvs(): Promise<CvEntity[]> {
        return await this.cvRepository.find();
    }
}

