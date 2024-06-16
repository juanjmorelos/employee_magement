import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesStaticsComponent } from './employees-statics.component';

describe('EmployeesStaticsComponent', () => {
  let component: EmployeesStaticsComponent;
  let fixture: ComponentFixture<EmployeesStaticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesStaticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
