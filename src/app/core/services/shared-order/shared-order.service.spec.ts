import { TestBed } from '@angular/core/testing';

import { SharedOrderService } from './shared-order.service';

describe('SharedOrderService', () => {
  let service: SharedOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
