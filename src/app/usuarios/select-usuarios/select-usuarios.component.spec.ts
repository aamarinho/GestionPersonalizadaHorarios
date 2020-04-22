import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUsuariosComponent } from './select-usuarios.component';

describe('SelectUsuariosComponent', () => {
  let component: SelectUsuariosComponent;
  let fixture: ComponentFixture<SelectUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
