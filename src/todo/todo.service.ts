import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';

@Injectable()
export class TodoService {
    todos: Todo[];

    getTodos(): Todo[]{
        return this.todos;
    }

    addTodo(newTodo: AddTodoDto): Todo{
        
        const {name,desc} = newTodo;
        
        let id;
        if(this.todos.length) {
            id=this.todos[this.todos.length-1].id+1;
        }else{
            id=1;
        }

        return {
            id,
            name,
            desc,
            createdAt : new Date()
        }   
    }

    getTodoById(id): Todo{
        const todo = this.todos.find(
            //+ to convert string to int
            (actualTodo: Todo) => 
                actualTodo.id === +id 
        );
        if (todo) 
            return todo;
        throw new NotFoundException("Todo with id "+id +" doesnt exist");
    }
}
