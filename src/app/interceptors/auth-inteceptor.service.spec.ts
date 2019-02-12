import { TestBed } from '@angular/core/testing';

import { AuthInteceptorService } from './auth-inteceptor.service';

describe('AuthInteceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInteceptorService = TestBed.get(AuthInteceptorService);
    expect(service).toBeTruthy();
  });
});
