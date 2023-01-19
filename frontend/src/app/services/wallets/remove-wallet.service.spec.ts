import { TestBed } from '@angular/core/testing';

import { RemoveWalletService } from './remove-wallet.service';

describe('RemoveWalletService', () => {
  let service: RemoveWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
