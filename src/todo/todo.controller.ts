import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import {Request , Response} from 'express'; 
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodo } from './dto/get-paginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

    constructor(
        private todoService: TodoService
    ){}

    //Rcuperer La liste des todos
    @Get()
    getTodos(
        @Query() mesQueryParams: GetPaginatedTodo
    ):Todo[] {
        console.log(mesQueryParams);
        return this.todoService.getTodos();
    }  

    @Get('v2')
    getTodosV2(
        @Req() request: Request,
        @Res() response: Response,
    ){
        //console.log(request);
        //console.log(response);
        response.status(500);
        response.json({
            contenu : 'prrr'
        })
        

        return this.todoService.getTodos();
    }

    
    //Recuperer Todo par ID
    @Get('/:id')
    getTodoByID(
        @Param('id',ParseIntPipe) id
    ){
        return this.todoService.getTodoById(id);
    }

    //Ajouter Todo
    @Post()
    addTodo(
        // @Body() newTodo

        // @Body('id') id : string,
        // @Body('name') name : string,

        @Body() newTodo : AddTodoDto
    ): Todo {
        
        // console.log(newTodo);

        // console.log(id,name)
        return this.todoService.addTodo(newTodo);
       
    }

    //Supprimer Todo par ID
    @Delete(':id')
    deleteTodo(
        @Param(
            'id',
            new ParseIntPipe(
                {
                    errorHttpStatusCode : HttpStatus.NOT_FOUND
                }
            )
        ) id
    ){
       
        return this.todoService.deleteTodo(id);
    }

    //Modifier Todo
    @Put(':id')
    modifTodo(
        @Param('id',ParseIntPipe) id,
        @Body() newTodo : Partial<AddTodoDto>
    ){
       return this.todoService.updateTodo(id,newTodo);
    }
}
