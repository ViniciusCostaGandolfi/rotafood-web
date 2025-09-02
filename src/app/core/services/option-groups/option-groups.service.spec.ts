import { TestBed } from '@angular/core/testing';

import { OptionGroupsService } from './option-groups.service';

describe('OptionGroupsService', () => {
  let service: OptionGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
