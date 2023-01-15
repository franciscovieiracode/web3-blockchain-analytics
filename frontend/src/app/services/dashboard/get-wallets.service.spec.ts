import { TestBed } from '@angular/core/testing';

import { GetWalletsService } from './get-wallets.service';

describe('GetWalletsService', () => {
  let service: GetWalletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWalletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
