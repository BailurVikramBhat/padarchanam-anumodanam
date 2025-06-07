import { TestBed } from '@angular/core/testing';

import { DatamodeService } from './datamode.service';

describe('DatamodeService', () => {
  let service: DatamodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatamodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
