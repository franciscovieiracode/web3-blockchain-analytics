import { TestBed } from '@angular/core/testing';

import { AddWalletsService } from './add-wallets.service';

describe('AddWalletsService', () => {
  let service: AddWalletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddWalletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
