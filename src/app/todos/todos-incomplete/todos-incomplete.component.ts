import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { DataStorageService } from 'src/app/data-storage.service';


@Component({
  selector: 'app-todos-incomplete',
  templateUrl: './todos-incomplete.component.html',
  styleUrls: ['./todos-incomplete.component.css']
})
export class TodosIncompleteComponent implements OnInit, OnDestroy {
  todos: Todo[];
  todosSubscription: Subscription;
  todosForm: FormGroup;
  editTodoForm: FormGroup;
  nothingTodo = true;
  editMode = false;
  todoIndex: number;


  constructor(
    private todoService: TodoService,
    private dataStorageService: DataStorageService
    ) {}

  ngOnInit() {
    this.dataStorageService.fetchTodos();
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
    this.dataStorageService.storeTodos();
    this.nothingTodo = false;
    // this.dataStorageService.fetchTodos();
  }

  onDeleteTodo(todo) {
    this.todoService.deleteTodo(todo);
    if (this.todos.length === 0) {
      this.nothingTodo = true;
    }
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
