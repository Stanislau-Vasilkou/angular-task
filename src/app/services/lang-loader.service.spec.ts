import { TestBed } from '@angular/core/testing';

import { LangLoaderService } from './lang-loader.service';

describe('LangLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LangLoaderService = TestBed.get(LangLoaderService);
    expect(service).toBeTruthy();
  });
});
