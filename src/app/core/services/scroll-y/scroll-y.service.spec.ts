import { TestBed } from '@angular/core/testing';

import { ScrollYService } from './scroll-y.service';

describe('ScrollYService', () => {
  let service: ScrollYService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollYService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
