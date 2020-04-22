import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarCalendarioComponent } from './generar-calendario.component';

describe('GenerarCalendarioComponent', () => {
  let component: GenerarCalendarioComponent;
  let fixture: ComponentFixture<GenerarCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
