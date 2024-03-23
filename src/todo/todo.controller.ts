import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Res } from '@nestjs/common';
import {Request , Response} from 'express'; 
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
    todos: Todo[];

    constructor(){
        this.todos= [];
    }
    

    @Get()
    getTodos(){
        return this.todos;
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
        

        return this.todos;
    }

    @Get('/:id')
    getTodo(
        @Param('id') id
    ){
        const todo = this.todos.find(
            //+ to convert string to int
            (actualTodo: Todo) => 
                actualTodo.id === +id 
        );
        if (todo) 
            return todo;
        throw new NotFoundException("Todo with id "+id +" doesnt exist");
    }

    @Post()
    addTodo(
        // @Body() newTodo

        // @Body('id') id : string,
        // @Body('name') name : string,

        @Body() newTodo : Todo
    ){
        
        // console.log(newTodo);

        // console.log(id,name)

        if(this.todos.length) {
            newTodo.id=this.todos[this.todos.length-1].id+1;
        }else{
            newTodo.id=1;
        }

        this.todos.push(newTodo);
    
        return newTodo;
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
