import { TestBed } from '@angular/core/testing';

import { ShowCatalogOnlineSideNavService } from '../../show-catalog-online-side-nav.service';

describe('ShowCatalogOnlineSideNavService', () => {
  let service: ShowCatalogOnlineSideNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowCatalogOnlineSideNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
