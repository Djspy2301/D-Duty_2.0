import { TestBed } from '@angular/core/testing';

import { SsServiceService } from './ss-service.service';

describe('SsServiceService', () => {
  let service: SsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
