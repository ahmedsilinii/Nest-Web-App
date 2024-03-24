import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import {Request , Response} from 'express'; 
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodo } from './dto/get-paginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';

@Controller('todo')
export class TodoController {
    todos: Todo[];

    constructor(){
        this.todos= [];
    }

    //Rcuperer La liste des todos
    @Get()
    getTodos(
        @Query() mesQueryParams: GetPaginatedTodo
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

    //Recuperer Todo par ID
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

    //Ajouter Todo
    @Post()
    addTodo(
        // @Body() newTodo

        // @Body('id') id : string,
        // @Body('name') name : string,

        @Body() newTodo : AddTodoDto
    ){
        
        // console.log(newTodo);

        // console.log(id,name)

        const todo = new Todo();
        const {name,desc} = newTodo;
        todo.name=name;
        todo.desc=desc;

        if(this.todos.length) {
            todo.id=this.todos[this.todos.length-1].id+1;
        }else{
            todo.id=1;
        }

        this.todos.push(todo);
    
        return todo;
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
