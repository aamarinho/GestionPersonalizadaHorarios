import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectGruposProfesorComponent } from './multi-select-grupos-profesor.component';

describe('MultiSelectGruposProfesorComponent', () => {
  let component: MultiSelectGruposProfesorComponent;
  let fixture: ComponentFixture<MultiSelectGruposProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectGruposProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectGruposProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
