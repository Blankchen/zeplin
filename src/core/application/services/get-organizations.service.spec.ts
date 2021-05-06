import { TestBed } from '@angular/core/testing';

import { GetOrganizationsService } from './get-organizations.service';

describe('GetOrganizationsService', () => {
  let service: GetOrganizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrganizationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
