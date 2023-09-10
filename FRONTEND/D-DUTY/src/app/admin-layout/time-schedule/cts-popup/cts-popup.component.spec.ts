import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtsPopupComponent } from './cts-popup.component';

describe('CtsPopupComponent', () => {
  let component: CtsPopupComponent;
  let fixture: ComponentFixture<CtsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CtsPopupComponent]
    });
    fixture = TestBed.createComponent(CtsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
