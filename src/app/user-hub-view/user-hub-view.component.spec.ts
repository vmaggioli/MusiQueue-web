import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserHubViewComponent } from './user-hub-view.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from '../shared/users.service'
import { HttpModule } from '@angular/http';
import { HubService } from '../shared/hub.service';
import {} from 'jasmine';

describe('UserHubViewComponent', () => {
  let component: UserHubViewComponent;
  let fixture: ComponentFixture<UserHubViewComponent>;
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
      declarations: [ UserHubViewComponent ],
      imports: [
        RouterTestingModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(config),
        HttpModule
      ],
      providers: [
        AuthService,
        AngularFireAuth,
        UsersService,
        HubService
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
