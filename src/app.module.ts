import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first.middleware';
import { logger } from './middlewares/logger.middleware';


@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware,logger).forRoutes(
    'hello',
    {
      //* anyth after todo
      path:'todo*',
      method: RequestMethod.DELETE
    },
    {
      path:'todo',
      method: RequestMethod.GET
    },
    );
  }
}


