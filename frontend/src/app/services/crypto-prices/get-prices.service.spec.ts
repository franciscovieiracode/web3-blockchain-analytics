import { TestBed } from '@angular/core/testing';

import { GetPricesService } from './get-prices.service';

describe('GetPricesService', () => {
  let service: GetPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
