import { TestBed } from '@angular/core/testing';

import { GetProjectScreensService } from './get-project-screens.service';

describe('GetProjectScreensService', () => {
  let service: GetProjectScreensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProjectScreensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
