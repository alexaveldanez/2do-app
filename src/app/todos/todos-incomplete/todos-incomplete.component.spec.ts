import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosIncompleteComponent } from './todos-incomplete.component';

describe('TodosIncompleteComponent', () => {
  let component: TodosIncompleteComponent;
  let fixture: ComponentFixture<TodosIncompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosIncompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosIncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
