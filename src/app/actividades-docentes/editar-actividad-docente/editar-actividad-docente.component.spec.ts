import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarActividadDocenteComponent } from './editar-actividad-docente.component';

describe('EditarActividadDocenteComponent', () => {
  let component: EditarActividadDocenteComponent;
  let fixture: ComponentFixture<EditarActividadDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarActividadDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarActividadDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
