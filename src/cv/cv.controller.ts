import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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

    //update cv with criteria
    @Patch()
    async updateCv2(
        @Body() updateObject,
    )  {
        const {updateCriteria, updateCvDto} = updateObject;
        return  this.cvService.updateCv2(updateCriteria, updateCvDto);
    }

    //delete cv
    @Delete(':id')
    async removeCv(
        @Param('id',ParseIntPipe) id: number
    ) {
        //return this.cvService.removeCv(id);
        // return this.cvService.deleteCv(id);
        // return this.cvService.softRemoveCv(id);
        return this.cvService.softDeleteCv(id);
    }

    //zeyda recover
    @Get('recover/:id')
    async recoverCv(
        @Param('id',ParseIntPipe) id: number
    ) {
        return await this.cvService.recoverCv(id);
    }

    //restore fel bd but still invisible
    @Get('restore/:id')
    async restoreCv(
        @Param('id',ParseIntPipe) id: number
    ) {
        return await this.cvService.restoreCv(id);
    }
    





}
