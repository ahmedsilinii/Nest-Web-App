import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  
  app.use(
    (req:Request, res: Response,next)=>{
      console.log("Middleware from app.use");
      next();
    }
  )

  app.useGlobalPipes(new ValidationPipe({
    //transform type
    transform: true,
    //accept ken lvalidators
    whitelist: true,
    //ken je haja blech validator kharej exception
    forbidNonWhitelisted: true
  }));
  await app.listen(3000);
}
bootstrap();
