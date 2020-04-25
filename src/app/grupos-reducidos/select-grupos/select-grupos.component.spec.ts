import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGruposComponent } from './select-grupos.component';

describe('SelectGruposComponent', () => {
  let component: SelectGruposComponent;
  let fixture: ComponentFixture<SelectGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
