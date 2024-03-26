import { Controller, Get } from '@nestjs/common';
import CvEntity from './entities/cv.entity/cv.entity';
import { CvService } from './cv.service';

@Controller('cv')
export class CvController {
    constructor(
        private readonly cvService: CvService
    ){}


    @Get()
    getAllCvs(): Promise<CvEntity[]>{
        return this.cvService.getCvs();
    }

}
