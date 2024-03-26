import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import CvEntity from './entities/cv.entity';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cv')
export class CvController {
    constructor(
        private readonly cvService: CvService
    ){}

    //get all cv
    @Get()
    async getAllCvs(): Promise<CvEntity[]>{
        return this.cvService.getCvs();
    }

    //add cv
    @Post()
    async addCv(
        @Body() cv: AddCvDto
    ): Promise<CvEntity> {
        return await this.cvService.addCv(cv);
    }

    //update cv
    @Patch(':id')
    async updateCv(
        @Body() cv: UpdateCvDto,
        @Param('id',ParseIntPipe) id: number 
    ): Promise<CvEntity> {
        return await this.cvService.updateCv(id, cv);
    }

    //update cv
    @Patch()
    async updateCv2(
        @Body() updateObject,
    )  {
        const {updateCriteria, updateCvDto} = updateObject;
        return await this.cvService.updateCv2(updateCriteria, updateCvDto);
    }






}
