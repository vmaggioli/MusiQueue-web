import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatButtonModule, MatTabsModule, MatInputModule,
  MatFormFieldModule, MatIconModule, MatMenuModule, MatSidenavModule,
  MatToolbarModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import { Animations } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import * as firebase from "firebase";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';
import { UsersService } from './shared/users.service';
import { HubService } from './shared/hub.service';
import { MedalService } from './shared/medal.service';
import { environment } from '../environments/environment';
import { NotifService } from './shared/notif.service';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { LoginGuard } from './shared/login-guard.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageUploadModule } from 'angular2-image-upload';


import { HubMainComponent } from './hub-main/hub-main.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HubUsersComponent } from './hub-users/hub-users.component';
import { CreateJoinComponent } from './create-join/create-join.component';
import { CreateHubComponent } from './create-hub/create-hub.component';
import { JoinHubComponent } from './join-hub/join-hub.component';
import { UserHubViewComponent } from './user-hub-view/user-hub-view.component';
import { HubLoginComponent } from './hub-login/hub-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OwnedHubsComponent } from './owned-hubs/owned-hubs.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HowToComponent } from './how-to/how-to.component';
import { HubProfileComponent } from './hub-profile/hub-profile.component';
import { HubProfileFormComponent } from './hub-profile-form/hub-profile-form.component';


import {NgxPaginationModule} from 'ngx-pagination';
import { MedalsComponent } from './medals/medals.component'; // <-- import the module

@NgModule({
  declarations: [
    AppComponent,
    HubMainComponent,
    HomeComponent,
    HubUsersComponent,
    CreateJoinComponent,
    CreateHubComponent,
    JoinHubComponent,
    UserHubViewComponent,
    HubLoginComponent,
    UserProfileComponent,
    OwnedHubsComponent,
    LeaderboardsComponent,
    ProfileFormComponent,
    NotificationsComponent,
    HowToComponent,
    HubProfileComponent,
    HubProfileFormComponent,
    MedalsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    YoutubePlayerModule,
    AppRoutingModule,
    RouterModule,
    MatTabsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    NgxPaginationModule,
    ImageUploadModule.forRoot(),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    UsersService,
    AuthService,
    LoginGuard,
    HubService,
    AngularFireAuth,
    AngularFireDatabase,
    NotifService,
    MedalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
