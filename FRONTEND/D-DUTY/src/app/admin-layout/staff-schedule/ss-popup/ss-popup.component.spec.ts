import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsPopupComponent } from './ss-popup.component';

describe('SsPopupComponent', () => {
  let component: SsPopupComponent;
  let fixture: ComponentFixture<SsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SsPopupComponent]
    });
    fixture = TestBed.createComponent(SsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
