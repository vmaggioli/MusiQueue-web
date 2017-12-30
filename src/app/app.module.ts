import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatButtonModule, MatTabsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
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
import { environment } from '../environments/environment';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { LoginGuard } from './shared/login-guard.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


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
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    UsersService,
    AuthService,
    LoginGuard,
    HubService,
    AngularFireAuth,
    AngularFireDatabase,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
