import { TestBed } from '@angular/core/testing';

import { HerpsService } from './herps.service';

describe('HerpsService', () => {
  let service: HerpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HerpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
