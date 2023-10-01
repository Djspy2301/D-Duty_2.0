import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingStaffComponent } from './scheduling-staff.component';

describe('SchedulingStaffComponent', () => {
  let component: SchedulingStaffComponent;
  let fixture: ComponentFixture<SchedulingStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulingStaffComponent]
    });
    fixture = TestBed.createComponent(SchedulingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
