import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Todo } from './todo.model';


@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private completedTodos: Todo[] = [];

  todosChanged = new Subject<Todo[]>();
  completedTodosChanged = new Subject<Todo[]>();

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore ) {}

  getUserTodos() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
          .collection<Todo>('todos', ref =>
          ref.where('uid', '==', user.uid)
          )
          .valueChanges({ idField: 'id'});
        } else {
          return[];
        }
      })
    );
  }

  async addNewTodo(data: Todo) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('todos').add({
      ...data,
      uid: user.uid
    });
  }

  deleteTodo(todoId: string) {
    return this.db.collection('todos').doc(todoId).delete();
  }

  updateTodo(todoId: string, text: string) {
    return this.db.collection('todos').doc(todoId).update({text});
  }

  async completedTodo(data) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('completedTodos').add({
      ...data,
      uid: user.uid
    });
  }

  getCompletedTodos() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
          .collection<Todo>('completedTodos', ref =>
          ref.where('uid', '==', user.uid)
          )
          .valueChanges({ idField: 'id'});
        } else {
          return[];
        }
      })
    );
  }



  //   getCompletedTodos() {
  //   this.completedTodosChanged.next(this.completedTodos.slice());
  // }

  // private todos: Todo[] = [];
  // private completedTodos: Todo[] = [];

  // todosChanged = new Subject<Todo[]>();
  // completedTodosChanged = new Subject<Todo[]>();

  // setTodos(todos: Todo[]) {
  //   this.todos = todos;
  //   this.todosChanged.next(this.todos.slice());
  // }

  // getTodos() {
  //   return this.todos.slice();
  // }



  // getTodo(index: number) {
  //   return this.todos[index];
  // }

  // addNewTodo(todoText) {
  //   if (todoText !== '') {
  //     this.todos.push({
  //       id: Date.now(),
  //       text: todoText,
  //       complete: false,
  //       date: new Date()
  //     });
  //     this.todosChanged.next(this.todos.slice());
  //   }
  // }

  // updateTodo(index: number, newTodo: Todo) {
  //   this.todos[index] = newTodo;
  //   this.todosChanged.next(this.todos.slice());
  // }

  // deleteTodo(index: number) {
  //   this.todos.splice(index, 1);
  //   this.todosChanged.next(this.todos.slice());
  // }


}
