import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposReducidosComponent } from './grupos-reducidos.component';

describe('GruposReducidosComponent', () => {
  let component: GruposReducidosComponent;
  let fixture: ComponentFixture<GruposReducidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposReducidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposReducidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
