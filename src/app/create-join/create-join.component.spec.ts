import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateJoinComponent } from './create-join.component';
import { MatCardModule, MatButtonModule, MatTabsModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UsersService } from '../shared/users.service';
import { HubService } from '../shared/hub.service';
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


describe('CreateJoinComponent', () => {
  let component: CreateJoinComponent;
  let fixture: ComponentFixture<CreateJoinComponent>;

  let usersService: UsersService;
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
        YoutubeService,
        AngularFireAuth,
        AngularFireDatabase,
      ],
      declarations: [ CreateJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJoinComponent);
    usersService = TestBed.get(UsersService);
    usersService.currentUser = new User("admin", "cJLlE03u8bfoWJQePFAsAjZuN9i2", true, false, "mqmobileproject@gmail.com", Date.now(), []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have username in input', () => {
    expect(usersService).toBeDefined();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('#uname_input'));
      let el = input.nativeElement;
      expect(el.value).toBe("admin");
    });

  });
});
