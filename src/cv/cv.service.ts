import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CvEntity from './entities/cv.entity';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Injectable()
export class CvService {
    constructor (
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>
    ) {}   
    
    async getCvs(user): Promise<CvEntity[]> {
        if (user.role === UserRoleEnum.ADMIN)
            return await this.cvRepository.find();
        return await this.cvRepository.createQueryBuilder('cv')
            .where('cv.user.id = :userId', { userId: user.id })
            .getMany();
    }

    async addCv(cv: AddCvDto, user: UserEntity) : Promise<CvEntity> {
        const newCv = this.cvRepository.create(cv);
        newCv.user = user;
        return await this.cvRepository.save(newCv);
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
        return this.cvRepository.update(updateCriteria, cv);
    }

    async findCvById(id: number) {
        const cv = await this.cvRepository.findOne({
            where: { id: id } 
        });
       if (!cv) {
           throw new NotFoundException(`cv with id ${id} not found`);
       }
        return cv;
    }

    async removeCv(id: number) {
        const cvToRemove =await this.findCvById(id);
        return this.cvRepository.remove(cvToRemove);
    }

    async deleteCv(id: number) {
        return this.cvRepository.delete(id);
    }

    async softRemoveCv(id: number) {
        const cvToRemove = await this.cvRepository.findOne({
            where: { id: id } 
        });
       if (!cvToRemove) {
           throw new NotFoundException(`cv with id ${id} not found`);
       }
        return this.cvRepository.softRemove(cvToRemove);
    }

    async softDeleteCv(id: number) {
        return this.cvRepository.softDelete(id);
    }

    async recoverCv(id: number) {
        const cvToRecover=await this.findCvById(id);
        return this.cvRepository.recover(cvToRecover);

    }

    async restoreCv(id: number) {
        return this.cvRepository.restore(id);
    }

    async statCvNumberByAge(maxAge, minAge =0){
        const qb= this.cvRepository.createQueryBuilder('cv');
        
        qb.select('cv.age as age,count(cv.id) as count')
         .where("cv.age >= :minAge and cv.age <= :maxAge")
         .setParameters({minAge, maxAge})
         .groupBy('age');
        
        return qb.getRawMany();         
        
      

    }
}

