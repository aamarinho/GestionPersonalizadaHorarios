import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMatriculaEstudianteComponent } from './select-matricula-estudiante.component';

describe('SelectMatriculaEstudianteComponent', () => {
  let component: SelectMatriculaEstudianteComponent;
  let fixture: ComponentFixture<SelectMatriculaEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMatriculaEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMatriculaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
