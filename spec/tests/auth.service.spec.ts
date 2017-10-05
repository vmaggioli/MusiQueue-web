import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';
import { AuthService } from '../../src/app/shared/auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
