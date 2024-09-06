import { TestBed } from '@angular/core/testing';

import { HtttpServiceService } from './htttp-service.service';

describe('HtttpServiceService', () => {
  let service: HtttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
