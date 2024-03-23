import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('todo')
export class TodoController {

    @Get()
    getTodos(){
        console.log('Recup todos');
        return 'Todos list';
    }

    @Post()
    addTodo(){
        console.log('Ajout todos');
        return 'Add TODO';
    }

    @Delete()
    deleteTodo(){
        console.log('Supp todo');
        return 'Delete TODO';
    }

    @Put()
    modifTodo(){
        console.log('modif todo');
        return 'Modif TODO';
    }
}
