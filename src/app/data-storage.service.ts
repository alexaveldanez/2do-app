import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TodoService } from './todos/todo.service';
import { Todo } from './todos/todo.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private todoService: TodoService) {}

  storeTodos() {
    const todos = this.todoService.getTodos();
    this.http.put('https://ng-todo-app-85e59.firebaseio.com/todos.json', todos)
    .subscribe(response => {
      console.log(response);
    });
  }

  fetchTodos() {
    this.http.get<Todo[]>('https://ng-todo-app-85e59.firebaseio.com//todos.json')
    .subscribe(todos => {
      this.todoService.setTodos(todos);
    });
  }

}
