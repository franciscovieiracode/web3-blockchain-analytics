import { TestBed } from '@angular/core/testing';

import { GetProfileSettingsService } from './get-profile-settings.service';

describe('GetProfileSettingsService', () => {
  let service: GetProfileSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProfileSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
