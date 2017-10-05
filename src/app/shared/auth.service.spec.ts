import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from './auth.service';
import { FirebaseApp } from 'angularfire2';
import {} from 'jasmine';

describe('AuthService', () => {
  var config = {
    apiKey: "AIzaSyAgvdKA3CBSgY3Oaooi8TDh4gA0iQgg5Ok",
    authDomain: "musiqueue-web.firebaseapp.com",
    databaseURL: "https://musiqueue-web.firebaseio.com",
    projectId: "musiqueue-web",
    storageBucket: "musiqueue-web.appspot.com",
    messagingSenderId: "386642263895"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AngularFireModule.initializeApp(config) ],
      providers: [
        AuthService,
        AngularFireAuth,
        FirebaseApp
      ]
    })
    .compileComponents();
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
