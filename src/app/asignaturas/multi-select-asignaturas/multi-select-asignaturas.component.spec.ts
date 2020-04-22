import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectAsignaturasComponent } from './multi-select-asignaturas.component';

describe('MultiSelectAsignaturasComponent', () => {
  let component: MultiSelectAsignaturasComponent;
  let fixture: ComponentFixture<MultiSelectAsignaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectAsignaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
