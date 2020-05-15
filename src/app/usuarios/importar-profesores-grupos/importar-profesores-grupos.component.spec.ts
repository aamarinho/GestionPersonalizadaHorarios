import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarProfesoresGruposComponent } from './importar-profesores-grupos.component';

describe('ImportarProfesoresGruposComponent', () => {
  let component: ImportarProfesoresGruposComponent;
  let fixture: ComponentFixture<ImportarProfesoresGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarProfesoresGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarProfesoresGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
