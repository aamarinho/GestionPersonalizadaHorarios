import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCalendarioComponent } from './menu-calendario.component';

describe('MenuCalendarioComponent', () => {
  let component: MenuCalendarioComponent;
  let fixture: ComponentFixture<MenuCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
