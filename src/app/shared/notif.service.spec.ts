import { TestBed, inject } from '@angular/core/testing';

import { NotifService } from './notif.service';

describe('NotifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifService]
    });
  });

  it('should be created', inject([NotifService], (service: NotifService) => {
    expect(service).toBeTruthy();
  }));
});
