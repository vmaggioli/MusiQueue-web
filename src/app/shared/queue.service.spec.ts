import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { QueueService } from './queue.service';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from './users.service';
import {} from 'jasmine';

describe('QueueService', () => {
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
      providers: [
        QueueService,
        AuthService,
        AngularFireAuth,
        UsersService
      ],
      imports: [
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(config)
       ]
    })
    .compileComponents();
  });

  it('should be created', inject([QueueService], (service: QueueService) => {
    expect(service).toBeTruthy();
  }));
});
