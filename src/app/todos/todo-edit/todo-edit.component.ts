import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  editTodoForm: FormGroup;
  id: number;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    // this.editForm();
  }

  // private editForm() {
  //   let todoText: string;
  //   const todo = this.todoService.getTodo(this.id);
  //   todoText = todo.text;

  //   this.editTodoForm = new FormGroup({
  //     todo: new FormControl(todoText, Validators.required)
  //   });
  //   }

}
