import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CvEntity from './entities/cv.entity';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/add-cv.dto';

@Injectable()
export class CvService {
    constructor (
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    ) {}   
    
    async getCvs(): Promise<CvEntity[]> {
        return await this.cvRepository.find();
    }

    async addCv(cv: AddCvDto) : Promise<CvEntity> {
        return await this.cvRepository.save(cv);
    }
}

