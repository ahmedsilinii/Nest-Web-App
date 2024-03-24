import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
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
    ){
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
        

        return this.todos;
    }

    
    //Recuperer Todo par ID
    @Get('/:id')
    getTodoByID(
        @Param('id') id
    ){
        this.todoService.getTodoById(id);
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

    //Modifier Todo
    @Put(':id')
    modifTodo(
        @Param('id') id,
        @Body() newTodo : Partial<AddTodoDto>
    ){
        const todo= this.getTodoByID(id);
        todo.desc = newTodo.desc? newTodo.desc : todo.desc;
        todo.name= newTodo.name? newTodo.name : todo.name;
        return todo;
    }
}
