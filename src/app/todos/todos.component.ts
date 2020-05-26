import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { TodoService } from './todo.service';
import { Todo } from './todo.model';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[];
  todosSubscription: Subscription;
  todosForm: FormGroup;
  editTodoForm: FormGroup;
  editMode = false;
  todoIndex: number;


  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.todosSubscription = this.todoService.todosChanged
    .subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
      }
    );
    this.todosForm = new FormGroup({
      todo: new FormControl('', Validators.required)
    });
    this.todos = this.todoService.getTodos();
  }

  onCheck(todo: Todo) {
    this.todoService.completedTodo(todo);
  }

  onAddTodo(todoText) {
    if (todoText !== '') {
      this.todoService.addNewTodo(todoText);
      this.todosForm.reset();
    } else {
      alert('Please enter a to do first!');
    }
  }

  onDeleteTodo(todo) {
    this.todoService.deleteTodo(todo);
  }

  onEditTodo(todo: Todo) {
    this.editMode = true;
    const id = todo.id;
    const editedTodoText = todo.text;
    const complete = todo.complete;
    const date = todo.date;
    this.todoIndex = this.todos.indexOf(todo);
    this.editTodoForm = new FormGroup({
      id: new FormControl(id),
      text: new FormControl(editedTodoText, Validators.required),
      complete: new FormControl(complete),
      date: new FormControl(date)
    });
  }

  onSubmitEditForm() {
    this.todoService.updateTodo(this.todoIndex, this.editTodoForm.value);
    this.editMode = false;
  }

  onCancel() {
    this.editMode = false;
  }

    ngOnDestroy() {
      this.todosSubscription.unsubscribe();
    }
  }
