import { TestBed } from '@angular/core/testing';

import { DefaultPackagingsService } from './default-packagings.service';

describe('DefaultPackagingsService', () => {
  let service: DefaultPackagingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultPackagingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
