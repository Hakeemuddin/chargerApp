import { TestBed } from '@angular/core/testing';

import { StationManagementService } from './station-management.service';

describe('StationManagementService', () => {
  let service: StationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
