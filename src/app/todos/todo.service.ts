import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Todo } from './todo.model';



@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private completedTodos: Todo[] = [];

  todosChanged = new Subject<Todo[]>();
  completedTodosChanged = new Subject<Todo[]>();

  setTodos(todos: Todo[]) {
    this.todos = todos;
    this.todosChanged.next(this.todos.slice());
  }

  getTodos() {
    return this.todos.slice();
  }

  getCompletedTodos() {
    this.completedTodosChanged.next(this.completedTodos.slice());
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

  completedTodo(todo: Todo) {
    todo.complete = true;
    const completedTodo = todo;
    this.completedTodos.push(completedTodo);
    const completedTodoId = this.todos.indexOf(todo);
    this.todos.splice(completedTodoId, 1);
    this.todosChanged.next(this.todos.slice());
    this.completedTodosChanged.next(this.completedTodos.slice());
  }
}
