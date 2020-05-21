import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Todo } from './todo.model';



@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  todosChanged = new Subject<Todo[]>();

  setTodos(todos: Todo[]) {
    this.todos = todos;
  }

  getTodos() {
    return this.todos.slice();
  }

  getTodo(index: number) {
    return this.todos[index];
  }

  addNewTodo(todoText) {
    if (todoText !== '') {
      this.todos.push({
        id: Date.now(),
        text: todoText,
        complete: false,
        date: new Date()
      });
      this.todosChanged.next(this.todos.slice());
    }
  }

  updateTodo(index: number, newTodo: Todo) {
    this.todos[index] = newTodo;
    this.todosChanged.next(this.todos.slice());
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.todosChanged.next(this.todos.slice());
  }

}
