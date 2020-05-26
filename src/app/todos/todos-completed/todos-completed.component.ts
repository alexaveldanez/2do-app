import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-todos-completed',
  templateUrl: './todos-completed.component.html',
  styleUrls: ['./todos-completed.component.css']
})
export class TodosCompletedComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'ToDo'];
  dataSource = new MatTableDataSource<Todo>();
  private completedTodosSub: Subscription;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.completedTodosSub = this.todoService.completedTodosChanged.subscribe(
      (completedTodos: Todo[]) => {
        this.dataSource.data = completedTodos;
      }
    );
    this.todoService.getCompletedTodos();
  }

  ngOnDestroy() {
    if (this.completedTodosSub) {
      this.completedTodosSub.unsubscribe();
    }
  }
}
