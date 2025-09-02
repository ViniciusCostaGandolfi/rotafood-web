import { TestBed } from '@angular/core/testing';

import { CatalogOnlineService } from './catalog-online.service';

describe('CatalogOnlineService', () => {
  let service: CatalogOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogOnlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
 