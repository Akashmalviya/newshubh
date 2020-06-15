import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStepsComponent } from './payment-steps.component';

describe('PaymentStepsComponent', () => {
  let component: PaymentStepsComponent;
  let fixture: ComponentFixture<PaymentStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
