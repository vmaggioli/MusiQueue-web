import { TestBed, inject } from '@angular/core/testing';

import { MedalService } from './medal.service';

describe('MedalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedalService]
    });
  });

  it('should be created', inject([MedalService], (service: MedalService) => {
    expect(service).toBeTruthy();
  }));
});
