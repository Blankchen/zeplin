import { TestBed } from '@angular/core/testing';

import { GetVersionComparisonService } from './get-version-comparison.service';

describe('GetVersionComparisonService', () => {
  let service: GetVersionComparisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVersionComparisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
