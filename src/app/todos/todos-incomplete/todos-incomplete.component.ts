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
  nothingTodo: boolean;
  editMode = false;
  todoId: string;


  constructor(
    private todoService: TodoService
    ) {}

    ngOnInit() {
      this.todosSubscription = this.todoService.getUserTodos().subscribe((todos) => {
        this.todos = todos;
        this.checkNothingTodo();
      });
      this.todosForm = new FormGroup({
      todo: new FormControl('', Validators.required)
      });
    }

    onAddTodo(todoText: string) {
      this.todoService.addNewTodo({
        text: todoText,
        complete: false,
        date: new Date(),
      });
      this.todosForm.reset();
      this.nothingTodo = false;
    }

    onCheck(todo) {
      const todoText = todo.text;
      this.todoService.completedTodo({
        text: todoText,
        complete: true,
        date: new Date()
      });
      this.todoService.deleteTodo(todo.id);
    }

    onDeleteTodo(todo) {
      this.todoService.deleteTodo(todo.id);
    }

    onEditTodo(todo) {
      this.editMode = true;
      const id = todo.id;
      const editedTodoText = todo.text;
      this.todoId = todo.id;
      this.editTodoForm = new FormGroup({
        text: new FormControl(editedTodoText, Validators.required)
    });
    }

  onSubmitEditForm() {
    this.todoService.updateTodo(this.todoId, this.editTodoForm.value.text);
    this.editMode = false;
  }

    onCancel() {
      this.editMode = false;
    }

    checkNothingTodo() {
      if (this.todos.length === 0 || this.todos === undefined) {
        this.nothingTodo = true;
      } else {
        this.nothingTodo = false;
      }
    }

    ngOnDestroy() {
      this.todosSubscription.unsubscribe();
    }
  }


  // ngOnInit() {
  //   this.dataStorageService.fetchTodos().subscribe();
  //   this.todosSubscription = this.todoService.todosChanged
  //   .subscribe(
  //     (todos: Todo[]) => {
  //       this.todos = todos;
  //     }
  //   );
  //   this.todosForm = new FormGroup({
  //     todo: new FormControl('', Validators.required)
  //   });
  //   this.todos = this.todoService.getTodos();
  //   if (this.todos) {
  //     this.nothingTodo = false;
  //     console.log(this.nothingTodo);
  //   }
  // }

  // onCheck(todo: Todo) {
  //   this.todoService.completedTodo(todo);
  // }

  // onAddTodo(todoText) {
  //   if (todoText !== '') {
  //     this.todoService.addNewTodo(todoText);
  //     this.todosForm.reset();
  //   } else {
  //     alert('Please enter a to do first!');
  //   }
  //   this.dataStorageService.storeTodos();
  //   this.nothingTodo = false;
  //   // this.dataStorageService.fetchTodos();
  // }

  // onDeleteTodo(todo) {
  //   this.todoService.deleteTodo(todo);
  //   if (this.todos.length === 0) {
  //     this.nothingTodo = true;
  //   }
  //   this.dataStorageService.storeTodos();
  // }


  // onEditTodo(todo: Todo) {
  //   this.editMode = true;
  //   const id = todo.id;
  //   const editedTodoText = todo.text;
  //   const complete = todo.complete;
  //   const date = todo.date;
  //   this.todoIndex = this.todos.indexOf(todo);
  //   this.editTodoForm = new FormGroup({
  //     id: new FormControl(id),
  //     text: new FormControl(editedTodoText, Validators.required),
  //     complete: new FormControl(complete),
  //     date: new FormControl(date)
  //   });
  // }

  // onSubmitEditForm() {
  //   this.todoService.updateTodo(this.todoIndex, this.editTodoForm.value);
  //   this.editMode = false;
  //   this.dataStorageService.storeTodos();
  // }

  // onCancel() {
  //   this.editMode = false;
  // }
