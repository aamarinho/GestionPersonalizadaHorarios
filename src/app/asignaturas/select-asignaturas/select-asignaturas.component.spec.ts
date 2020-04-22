import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAsignaturasComponent } from './select-asignaturas.component';

describe('SelectAsignaturasComponent', () => {
  let component: SelectAsignaturasComponent;
  let fixture: ComponentFixture<SelectAsignaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAsignaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
