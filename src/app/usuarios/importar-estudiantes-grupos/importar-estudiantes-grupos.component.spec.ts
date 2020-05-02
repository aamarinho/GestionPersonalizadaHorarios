import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarEstudiantesGruposComponent } from './importar-estudiantes-grupos.component';

describe('ImportarEstudiantesGruposComponent', () => {
  let component: ImportarEstudiantesGruposComponent;
  let fixture: ComponentFixture<ImportarEstudiantesGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarEstudiantesGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarEstudiantesGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
