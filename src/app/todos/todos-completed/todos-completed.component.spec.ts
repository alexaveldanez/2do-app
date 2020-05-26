import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosCompletedComponent } from './todos-completed.component';

describe('TodosCompletedComponent', () => {
  let component: TodosCompletedComponent;
  let fixture: ComponentFixture<TodosCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
