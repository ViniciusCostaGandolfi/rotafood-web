import { TestBed } from '@angular/core/testing';

import { ContextModifiersService } from './context-modifiers.service';

describe('ContextModifiersService', () => {
  let service: ContextModifiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextModifiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
