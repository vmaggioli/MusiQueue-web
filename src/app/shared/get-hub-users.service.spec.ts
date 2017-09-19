import { TestBed, inject } from '@angular/core/testing';

import { GetHubUsersService } from './get-hub-users.service';

describe('GetHubUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetHubUsersService]
    });
  });

  it('should be created', inject([GetHubUsersService], (service: GetHubUsersService) => {
    expect(service).toBeTruthy();
  }));
});
