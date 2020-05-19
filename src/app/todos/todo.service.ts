import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { isNgTemplate } from '@angular/compiler';

@Injectable()
export class TodoService {
  todos: Todo[] = [];


  addNewTodo(todoText) {
    if (todoText !== '') {
      this.todos.push({
        id: Date.now(),
        text: todoText,
        complete: false,
        date: new Date()
      });
    }
  }

  updateTodo() {

  }

  deleteTodo() {

  }

}
