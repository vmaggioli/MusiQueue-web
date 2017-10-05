import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomeComponent } from './home.component';
import { AngularFireModule } from 'angularfire2';
import { UsersService } from '../shared/users.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import {} from 'jasmine';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  var config = {
    apiKey: "AIzaSyAgvdKA3CBSgY3Oaooi8TDh4gA0iQgg5Ok",
    authDomain: "musiqueue-web.firebaseapp.com",
    databaseURL: "https://musiqueue-web.firebaseio.com",
    projectId: "musiqueue-web",
    storageBucket: "musiqueue-web.appspot.com",
    messagingSenderId: "386642263895"
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        RouterTestingModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(config),
        AngularFireDatabaseModule
      ],
      providers: [
        AuthService,
        UsersService,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
