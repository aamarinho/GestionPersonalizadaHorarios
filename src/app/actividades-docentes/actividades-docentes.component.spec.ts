import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesDocentesComponent } from './actividades-docentes.component';

describe('ActividadesDocentesComponent', () => {
  let component: ActividadesDocentesComponent;
  let fixture: ComponentFixture<ActividadesDocentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesDocentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
