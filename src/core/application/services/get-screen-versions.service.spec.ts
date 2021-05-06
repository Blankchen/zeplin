import { TestBed } from '@angular/core/testing';

import { GetScreenVersionsService } from './get-screen-versions.service';

describe('GetScreenVersionsService', () => {
  let service: GetScreenVersionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetScreenVersionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
