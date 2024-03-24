import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import {Request , Response} from 'express'; 
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
    todos: Todo[];

    constructor(){
        this.todos= [];
    }
    

    @Get()
    getTodos(
        @Query() mesQueryParams
    ){
        console.log(mesQueryParams);
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
    getTodoByID(
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

    //supprimer un todo via id
    @Delete(':id')
    deleteTodo(
        @Param('id') id
    ){
        //slice to delete if exists, else error
        const index=this.todos.findIndex(
            (todo: Todo) => todo.id === +id
        );

        if (index>=0){
            this.todos.slice(index,1);
        }else{
            throw new NotFoundException("Le todo d'id"+id+" nexiste pas");
        }

        return {
            message : 'Todo d id '+id+' supprimé', 
            count : 1
        };

        console.log('Supp todo');
        return 'Delete TODO';
    }

    @Put(':id')
    modifTodo(
        @Param('id') id,
        @Body() newTodo : Partial<Todo>
    ){
        const todo= this.getTodoByID(id);
        todo.desc = newTodo.desc? newTodo.desc : todo.desc;
        todo.name= newTodo.name? newTodo.name : todo.name;
        return todo;
    }
}
