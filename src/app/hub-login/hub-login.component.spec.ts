import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HubService } from '../shared/hub.service';
import { HubLoginComponent } from './hub-login.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UsersService } from '../shared/users.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HubLoginComponent', () => {
  let component: HubLoginComponent;
  let fixture: ComponentFixture<HubLoginComponent>;
  const config = {
    apiKey: "AIzaSyAgvdKA3CBSgY3Oaooi8TDh4gA0iQgg5Ok",
    authDomain: "musiqueue-web.firebaseapp.com",
    databaseURL: "https://musiqueue-web.firebaseio.com",
    projectId: "musiqueue-web",
    storageBucket: "musiqueue-web.appspot.com",
    messagingSenderId: "386642263895"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(config),
        RouterTestingModule
       ],
      declarations: [ HubLoginComponent ],
      providers: [
        HubService,
        AuthService,
        UsersService
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
