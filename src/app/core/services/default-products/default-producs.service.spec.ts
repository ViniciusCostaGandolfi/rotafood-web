import { TestBed } from '@angular/core/testing';

import { DefaultProducsService } from './default-producs.service';

describe('DefaultProducsService', () => {
  let service: DefaultProducsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultProducsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
