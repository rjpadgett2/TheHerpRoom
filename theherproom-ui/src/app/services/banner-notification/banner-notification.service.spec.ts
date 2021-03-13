import { TestBed } from '@angular/core/testing';

import { BannerNotificationService } from './banner-notification.service';

describe('BannerNotificationService', () => {
  let service: BannerNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
