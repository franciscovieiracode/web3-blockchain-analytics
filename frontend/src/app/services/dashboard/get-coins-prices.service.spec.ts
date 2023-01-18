import { TestBed } from '@angular/core/testing';

import { GetCoinsPricesService } from './get-coins-prices.service';

describe('GetCoinsPricesService', () => {
  let service: GetCoinsPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCoinsPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
