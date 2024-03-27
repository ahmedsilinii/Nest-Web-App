import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CvEntity from './entities/cv.entity';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CvService {
    constructor (
        @InjectRepository(CvEntity)
        private cvRepository: Repository<CvEntity>,
        private userService: UserService
    ) {}   
    
    async getCvs(user): Promise<CvEntity[]> {
        if (user && user.role === UserRoleEnum.ADMIN)
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

    async updateCv(id: number,cv: UpdateCvDto,user): Promise<CvEntity> {
        const newCv = await this.cvRepository.preload( {
            id,
            ...cv
        });
        if (!newCv) {
            throw new NotFoundException(`cv with id ${id} not found`);
        }
        if(this.userService.isOwnerOrAdmin(newCv, user))
            return await this.cvRepository.save(newCv);
        else
            throw new UnauthorizedException();
    }

    updateCv2(updateCriteria, cv: UpdateCvDto) {
        return this.cvRepository.update(updateCriteria, cv);
    }

    async findCvById(id: number,user) {
        const cv = await this.cvRepository.findOne({
            where: { id: id } 
        });
        if (!cv) {
            throw new NotFoundException(`cv with id ${id} not found`);
        }
    
        if (!user) {
            throw new NotFoundException("mafamech user");
        }
    
        if (!cv.user) {
            throw new NotFoundException(`cv ma3andouch user yaan bouk`);
        }
    
        if ( this.userService.isOwnerOrAdmin(cv, user)) {
         return cv;
        }else{
         throw new UnauthorizedException();
       }
    }

    /*remove
    async removeCv(id: number,user) {
        const cvToRemove =await this.findCvById(id,user);
        return this.cvRepository.remove(cvToRemove);
    }
    */

    /*delete
    async deleteCv(id: number) {
        return this.cvRepository.delete(id);
    }
    */

    /*soft remove
    async softRemoveCv(id: number) {
        const cvToRemove = await this.cvRepository.findOne({
            where: { id: id } 
        });
       if (!cvToRemove) {
           throw new NotFoundException(`cv with id ${id} not found`);
       }
        return this.cvRepository.softRemove(cvToRemove);
    }
    */

    /*recover lel soft remove
    async recoverCv(id: number,user) {
        const cvToRecover=await this.findCvById(id,user);
        return this.cvRepository.recover(cvToRecover);

    }
    */

    async softDeleteCv(id: number,user) {
        const cv =await this.cvRepository.findOne({where: {id}});
        if(!cv.user){
            throw new NotFoundException(`allah la trabhek`);
        }
        if (!cv) {
            throw new NotFoundException(`cv with id ${id} not found`);
        }
        if (this.userService.isOwnerOrAdmin(cv, user))
            return await this.cvRepository.softDelete(id);
        else
            throw new UnauthorizedException();
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

