import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { DurationInterceptor } from './interceptors/duration.interceptor';


dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Middlewares
  const corsOptions={
    origin : ['http://localhost:4200']
  }
  app.enableCors(corsOptions);
  app.use(morgan('dev'));
  app.use(
    (req:Request, res: Response,next)=>{
      console.log("Middleware from app.use");
      next();
    }
  )

  //Pipes
  app.useGlobalPipes(new ValidationPipe({
    //transform type
    transform: true,
    //accept ken lvalidators
    whitelist: true,
    //ken je haja blech validator kharej exception
    forbidNonWhitelisted: true
  }));

  //Interceptors
  app.useGlobalInterceptors(new DurationInterceptor());

  await app.listen(process.env.APP_PORT);

}
bootstrap();
