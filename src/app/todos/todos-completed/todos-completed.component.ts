import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';




@Component({
  selector: 'app-todos-completed',
  templateUrl: './todos-completed.component.html',
  styleUrls: ['./todos-completed.component.css']
})
export class TodosCompletedComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = ['date', 'ToDo'];
  dataSource = new MatTableDataSource<Todo>();
  private completedTodosSub: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.completedTodosSub = this.todoService.completedTodosChanged.subscribe(
      (completedTodos: Todo[]) => {
        this.dataSource.data = completedTodos;
      }
    );
    this.todoService.getCompletedTodos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.completedTodosSub) {
      this.completedTodosSub.unsubscribe();
    }
  }
}
