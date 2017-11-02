import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubLoginComponent } from './hub-login.component';
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

describe('HubLoginComponent', () => {
  let component: HubLoginComponent;
  let fixture: ComponentFixture<HubLoginComponent>;

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
       ],
      providers: [
        UsersService,
        AuthService,
        HubService,
        AngularFireAuth,
        AngularFireDatabase,
      ],
      declarations: [ HubLoginComponent ]
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
