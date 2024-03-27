import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import CvEntity from './entities/cv.entity';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

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
    @UseGuards(JwtAuthGuard)
    async addCv(
        @Body() cv: AddCvDto,
        @Req() req
    ): Promise<CvEntity> {
        const user = req.user;
        return await this.cvService.addCv(cv, user);
    }

    //update cv with criteria
    @Patch()
    @UseGuards(JwtAuthGuard)
    async updateCv2(
        @Body() updateObject,
    )  {
        const {updateCriteria, updateCvDto} = updateObject;
        return  this.cvService.updateCv2(updateCriteria, updateCvDto);
    }

    //zeyda recover
    @Get('recover/:id')
    @UseGuards(JwtAuthGuard)
    async recoverCv(
        @Param('id',ParseIntPipe) id: number
    ) {
        return await this.cvService.recoverCv(id);
    }

    //restore fel bd but still invisible
    @Get('restore/:id')
    @UseGuards(JwtAuthGuard)
    async restoreCv(
        @Param('id',ParseIntPipe) id: number
    ) {
        return await this.cvService.restoreCv(id);
    }
    
    //stats
    @Get('stats/:max/:min')
    @UseGuards(JwtAuthGuard)
    async getStat(
        @Param('max',ParseIntPipe) max: number,
        @Param('min',ParseIntPipe) min: number
    ) {
        return this.cvService.statCvNumberByAge(max,min);
    }

    @Get(':id')
    async getCvById(
        @Param('id',ParseIntPipe) id: number
    ) {
        return await this.cvService.findCvById(id);
    }

    //delete cv
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async removeCv(
        @Param('id',ParseIntPipe) id: number
    ) {
        //return this.cvService.removeCv(id);
        // return this.cvService.deleteCv(id);
        // return this.cvService.softRemoveCv(id);
        return this.cvService.softDeleteCv(id);
    }

      //update cv
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateCv(
        @Body() cv: UpdateCvDto,
        @Param('id',ParseIntPipe) id: number 
    ): Promise<CvEntity> {
        return await this.cvService.updateCv(id, cv);
    }

}
