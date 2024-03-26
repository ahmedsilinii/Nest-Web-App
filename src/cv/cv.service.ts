import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CvEntity from './entities/cv.entity';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

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

    async updateCv(id: number,cv: UpdateCvDto): Promise<CvEntity> {
        const newCv = await this.cvRepository.preload( {
            id,
            ...cv
        });
        if (!newCv) {
            throw new NotFoundException(`cv with id ${id} not found`);
        }
        return await this.cvRepository.save(newCv);
    }

    updateCv2(updateCriteria, cv: UpdateCvDto) {
        this.cvRepository.update(updateCriteria, cv);
    }
}

