import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JoinHubComponent } from './join-hub.component';
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

describe('JoinHubComponent', () => {
  let component: JoinHubComponent;
  let fixture: ComponentFixture<JoinHubComponent>;

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
      declarations: [ JoinHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have search parameter in results', async(() => {
    let input = fixture.debugElement.query(By.css('#search-input'));
    let el = input.nativeElement;
    el.value = "brian";
    let searchButton = fixture.debugElement.query(By.css('#search-button'));
    let searchButtonEl = searchButton.nativeElement;
    searchButtonEl.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let result = fixture.debugElement.query(By.css('.hub-search-list'));
      let results = result.children;
      results.forEach(res => {
        console.log(res.context.$implicit);
      });
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let result = fixture.debugElement.query(By.css('.hub-search-list'));
        let results = result.children;
        results.forEach(res => {
          let good = res.context.$implicit.name.indexOf("brian") >= 0;
          expect(good).toBe(true);
        });
      });
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
