import { Global, Module } from '@nestjs/common';
import { TodoController } from './todo.controller';

//global module
@Global()
@Module({
  controllers: [TodoController]
})
export class TodoModule {}
