import { TestBed } from '@angular/core/testing';

import { LocalPrinterService } from './local-printer.service';

describe('LocalPrinterService', () => {
  let service: LocalPrinterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalPrinterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
