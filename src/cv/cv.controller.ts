import { Body, Controller, Get, Post } from '@nestjs/common';
import CvEntity from './entities/cv.entity';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/add-cv.dto';

@Controller('cv')
export class CvController {
    constructor(
        private readonly cvService: CvService
    ){}


    @Get()
    async getAllCvs(): Promise<CvEntity[]>{
        return this.cvService.getCvs();
    }

    @Post()
    async addCv(
        @Body() cv: AddCvDto
    ): Promise<CvEntity> {
        return await this.cvService.addCv(cv);
    }

}
