import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSupportComponent } from './trip-support.component';

describe('TripSupportComponent', () => {
  let component: TripSupportComponent;
  let fixture: ComponentFixture<TripSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
