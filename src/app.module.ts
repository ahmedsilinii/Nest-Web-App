import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first/first.middleware';


@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes('todo');
  }
}


