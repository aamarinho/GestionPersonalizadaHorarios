import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectGruposComponent } from './multi-select-grupos.component';

describe('MultiSelectGruposComponent', () => {
  let component: MultiSelectGruposComponent;
  let fixture: ComponentFixture<MultiSelectGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
