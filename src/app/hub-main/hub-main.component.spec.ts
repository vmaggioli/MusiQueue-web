import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HubMainComponent } from './hub-main.component';
import { MatCardModule, MatButtonModule, MatTabsModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UsersService } from '../shared/users.service';
import { HubService } from '../shared/hub.service';
import { QueueService } from '../shared/queue.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YoutubeService } from '../shared/youtube.service';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { HttpModule } from "@angular/http";
import { User } from '../objects/user';
import { Hub } from '../objects/hub';


describe('HubMainComponent', () => {
  let component: HubMainComponent;
  let fixture: ComponentFixture<HubMainComponent>;
  let hubService: HubService;
  let usersService: UsersService;
  let queueService: QueueService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        RouterModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        YoutubePlayerModule,
        HttpModule,
       ],
      providers: [
        UsersService,
        AuthService,
        HubService,
        QueueService,
        YoutubeService,
        AngularFireAuth,
        AngularFireDatabase,
      ],
      declarations: [ HubMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubMainComponent);
    component = fixture.componentInstance;
    usersService = TestBed.get(UsersService);
    usersService.currentUser = new User("admin", "cJLlE03u8bfoWJQePFAsAjZuN9i2", true, false, "mqmobileproject@gmail.com", Date.now(), []);
    hubService = TestBed.get(HubService);
    hubService.currentHub = new Hub("karma", "admin", "cJLlE03u8bfoWJQePFAsAjZuN9i2", "1234", Date.now(), [], []);
    queueService = TestBed.get(QueueService);
    fixture.detectChanges();
  });

  it ('should succeed with setup', async(() => {
    queueService.addSong("Eric Church - Round Here Buzz", "https://i.ytimg.com/vi/0_CksCHnooM/default.jpg", "0_CksCHnooM", "karma");
    queueService.addSong("Eric Church - Record Year", "https://i.ytimg.com/vi/gvvYMxV6TmI/default.jpg", "gvvYMxV6TmI", "karma");
    queueService.addSong("Eric Church - Smoke A Little Smoke", "https://i.ytimg.com/vi/XxWjtWONuGc/default.jpg", "XxWjtWONuGc", "karma");
  }));

  it('should have first song as "currentSong"', async(() => {
    queueService.getCurrent("karma").subscribe(cur => {
      expect(cur.video_id).toBe("0_CksCHnooM");
    });
  }));

  it('should have same length queue on front and back ends', async(() => {
    queueService.getQueue("karma").subscribe(list => {
      let l = fixture.debugElement.query(By.css('#queue-list'));
      expect(list.length).toBe(l.componentInstance.songs.length);
    });
  }));

  it('should have title of hub name', async(() => {
    expect(fixture.debugElement.query(By.css('#hubTitle')).nativeElement.innerHTML).toContain(hubService.currentHub.name);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
