import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroActividadDocenteComponent } from './registro-actividad-docente.component';

describe('RegistroActividadDocenteComponent', () => {
  let component: RegistroActividadDocenteComponent;
  let fixture: ComponentFixture<RegistroActividadDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroActividadDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroActividadDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
