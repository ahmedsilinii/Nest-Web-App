import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first.middleware';
import { logger } from './middlewares/logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';


@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(FirstMiddleware).forRoutes(
      'hello',
      { path:'todo*', method: RequestMethod.DELETE },
      { path:'todo', method: RequestMethod.GET },
    )
   .apply(logger).forRoutes('')
   .apply(HelmetMiddleware).forRoutes('')
   ;

  }
}


