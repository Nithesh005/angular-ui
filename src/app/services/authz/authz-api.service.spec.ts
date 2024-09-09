import { TestBed } from '@angular/core/testing';

import { AuthzApiService } from './authz-api.service';

describe('AuthzApiService', () => {
  let service: AuthzApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthzApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
