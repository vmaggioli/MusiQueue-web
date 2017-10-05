import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { HubService } from './hub.service';
import {} from 'jasmine';

describe('HubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HubService,
        AngularFireDatabase,
        FirebaseApp
      ]
    });
  });

  it('should be created', inject([HubService], (service: HubService) => {
    expect(service).toBeTruthy();
  }));
});
