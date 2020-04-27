import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesProfesorComponent } from './estudiantes-profesor.component';

describe('EstudiantesProfesorComponent', () => {
  let component: EstudiantesProfesorComponent;
  let fixture: ComponentFixture<EstudiantesProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
