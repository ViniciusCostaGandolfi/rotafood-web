import { TestBed } from '@angular/core/testing';

import { MerchantUsersService } from './merchant-users.service';

describe('MerchantUsersService', () => {
  let service: MerchantUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
