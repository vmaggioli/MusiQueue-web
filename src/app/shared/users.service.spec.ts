import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UsersService } from './users.service';
import { HttpModule } from '@angular/http'
import { AngularFireModule } from 'angularfire2';
import {} from 'jasmine';

describe('UsersService', () => {
  var config = {
    apiKey: "AIzaSyAgvdKA3CBSgY3Oaooi8TDh4gA0iQgg5Ok",
    authDomain: "musiqueue-web.firebaseapp.com",
    databaseURL: "https://musiqueue-web.firebaseio.com",
    projectId: "musiqueue-web",
    storageBucket: "musiqueue-web.appspot.com",
    messagingSenderId: "386642263895"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(config),
        HttpModule
      ],
      providers: [
        UsersService
       ]
    })
    .compileComponents();
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
