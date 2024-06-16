import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAuthorizationComponent } from './payment-authorization.component';

describe('PaymentAuthorizationComponent', () => {
  let component: PaymentAuthorizationComponent;
  let fixture: ComponentFixture<PaymentAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAuthorizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
