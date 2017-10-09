import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { HubService } from './hub.service';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {} from 'jasmine';

describe('HubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireAuthModule
      ],
      providers: [
        HubService,
        AngularFireDatabase,
        FirebaseApp,
        AuthService
      ]
    });
  });

  it('should be created', inject([HubService], (service: HubService) => {
    expect(service).toBeTruthy();
  }));
});
