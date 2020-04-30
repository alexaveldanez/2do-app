import { Component, OnInit } from '@angular/core';

import { Todo } from './Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  mockData: Todo[] = [
    {
      id: 1,
      todo: 'This is a todo',
      complete: false,
      date: new Date()
    }, {
      id: 2,
      todo: 'This is second todo',
      complete: false,
      date: new Date()
    }, {
      id: 3,
      todo: 'This is third todo',
      complete: false,
      date: new Date()
    }, {
      id: 4,
      todo: 'This is forth todo',
      complete: false,
      date: new Date()
    }
  ];

  show: boolean = false;
  value: string;
  id: number;

  constructor() { }

  ngOnInit() {
  }

  create(item) {
    if (item !== '') {
      this.mockData.push({
        id: Date.now(),
        todo: item,
        complete: false,
        date: new Date()
      });
    } else {
      alert('Enter a todo!');
    }
    console.log(item);
    console.log(this.mockData);
  }

  delete(id) {
    this.mockData = this.mockData.filter(item => {
      if (item.id !== id) {
        return item;
      }
    });
  }

  edit(id, title) {
    this.show = true;
    this.value = title;
    this.id = id;
  }

  update(title) {
    this.mockData.map(item => {
      if (item.id === this.id) {
        item['title'] = title;
      }
    });
    this.show = false;
  }

  setTaskComplete(id) {
    this.mockData.map(item => {
      if (item.id === id) {
        item['done'] = true;
      }
    });
  }

}
