import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEstudiantesComponent } from './select-estudiantes.component';

describe('SelectEstudiantesComponent', () => {
  let component: SelectEstudiantesComponent;
  let fixture: ComponentFixture<SelectEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
