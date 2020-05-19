import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  todosForm: FormGroup;
  editMode = false;

  constructor() {}

  ngOnInit() {
    this.todosForm = new FormGroup({
      todo: new FormControl()
    });
  }

  onAddTodo(todoText) {
    if (todoText !== '') {
      this.todos.push({
        id: Date.now(),
        text: todoText,
        complete: false,
        date: new Date()
      });
      this.todosForm.reset();
    } else {
      alert('Enter a todo!');
    }
    console.log(this.todos);
  }

  deleteTodo(todo) {
    for (let i = 0; i <= this.todos.length; i++) {
      if (todo === this.todos[i]) {
        this.todos.splice(i, 1);
      }
    }
    console.log(this.todos);
  }

  editTodo() {
    this.editMode = true;
  }

}
