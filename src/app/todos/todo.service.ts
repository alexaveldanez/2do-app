import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Todo } from './todo.model';


@Injectable()
export class TodoService {

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

}
