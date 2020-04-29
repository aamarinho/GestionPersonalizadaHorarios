import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAsignaturaComponent } from './editar-asignatura.component';

describe('EditarAsignaturaComponent', () => {
  let component: EditarAsignaturaComponent;
  let fixture: ComponentFixture<EditarAsignaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAsignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
