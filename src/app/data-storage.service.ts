import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take, exhaustMap, tap } from 'rxjs/operators';

import { TodoService } from './todos/todo.service';
import { Todo } from './todos/todo.model';
import { AuthService } from './auth/auth.service';


@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private todoService: TodoService,
    private authService: AuthService
    ) {}

  storeTodos() {
    const todos = this.todoService.getTodos();
    this.http.put('https://ng-todo-app-85e59.firebaseio.com/todos.json', todos)
    .subscribe(response => {
      console.log(response);
    });
  }

  fetchTodos() {
        return this.http.get<Todo[]>(
          'https://ng-todo-app-85e59.firebaseio.com//todos.json?auth='
        ).pipe(
          tap(todos => {
            this.todoService.setTodos(todos);
          })
        );
      }

}
