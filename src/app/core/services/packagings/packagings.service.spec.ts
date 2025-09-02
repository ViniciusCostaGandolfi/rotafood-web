import { TestBed } from '@angular/core/testing';

import { PackagingsService } from './packagings.service';

describe('PackagingsService', () => {
  let service: PackagingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackagingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
