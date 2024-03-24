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

    getTodoById(id: number): Todo{
        const todo = this.todos.find(
            (actualTodo: Todo) => 
                actualTodo.id === id 
        );
        if (todo) 
            return todo;
        throw new NotFoundException("Todo with id "+id +" doesnt exist");
    }

    deleteTodo(id:number){
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

    }

    updateTodo(id:number, newTodo: Partial<AddTodoDto>){
        const todo= this.getTodoById(id);
        todo.desc = newTodo.desc? newTodo.desc : todo.desc;
        todo.name= newTodo.name? newTodo.name : todo.name;
        return todo;
    }
}


