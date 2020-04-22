import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroGrupoComponent } from './registro-grupo.component';

describe('RegistroGrupoComponent', () => {
  let component: RegistroGrupoComponent;
  let fixture: ComponentFixture<RegistroGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
