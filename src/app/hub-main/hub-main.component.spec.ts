import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HubMainComponent } from './hub-main.component';
import { YoutubeService } from '../shared/youtube.service';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from '../shared/users.service';
import { HttpModule } from '@angular/http';
import { HubService } from '../shared/hub.service';
import {} from 'jasmine';

describe('HubMainComponent', () => {
  let component: HubMainComponent;
  let fixture: ComponentFixture<HubMainComponent>;
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
      declarations: [
        HubMainComponent,
      ],
      imports: [
        RouterTestingModule,
        YoutubePlayerModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(config),
        HttpModule
       ],
      providers: [
        YoutubeService,
        AuthService,
        AngularFireAuth,
        UsersService,
        HubService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
