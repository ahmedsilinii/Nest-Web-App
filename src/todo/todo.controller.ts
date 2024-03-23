import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';

@Controller('todo')
export class TodoController {

    @Get()
    getTodos(
        @Req() request: Request,
        @Res() response: Response,
    ){
        //console.log(request);
        //console.log(response);
        console.log('Recup todos');

        return 'Todos list ';
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
