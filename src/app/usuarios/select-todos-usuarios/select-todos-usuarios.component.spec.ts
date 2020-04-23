import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTodosUsuariosComponent } from './select-todos-usuarios.component';

describe('SelectTodosUsuariosComponent', () => {
  let component: SelectTodosUsuariosComponent;
  let fixture: ComponentFixture<SelectTodosUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTodosUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTodosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
