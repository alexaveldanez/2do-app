import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos-incomplete',
  templateUrl: './todos-incomplete.component.html',
  styleUrls: ['./todos-incomplete.component.scss']
})
export class TodosIncompleteComponent implements OnInit, OnDestroy {
  todos: Todo[];
  todosSubscription: Subscription;
  todosForm: FormGroup;
  editTodoForm: FormGroup;
  nothingTodo: boolean;
  editMode = false;
  todoId: string;


  constructor(private todoService: TodoService) {}

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
      if (todoText !== '') {
        this.todoService.addNewTodo({
          text: todoText,
          complete: false,
          date: new Date(),
        });
      } else {
        alert('Please enter something to do first!');
      }
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
