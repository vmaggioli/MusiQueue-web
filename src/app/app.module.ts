import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {MdTabsModule} from '@angular/material';

import { AppComponent } from './app.component';
import * as firebase from "firebase";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';
import { UsersService } from './shared/users.service';
import { HubService } from './shared/hub.service';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { LoginGuard } from './shared/login-guard.module';

import { HubMainComponent } from './hub-main/hub-main.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HubUsersComponent } from './hub-users/hub-users.component';
import { CreateJoinComponent } from './create-join/create-join.component';
import { CreateHubComponent } from './create-hub/create-hub.component';
import { JoinHubComponent } from './join-hub/join-hub.component';
import { UserHubViewComponent } from './user-hub-view/user-hub-view.component';
import { HubLoginComponent } from './hub-login/hub-login.component';

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
    HubLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    YoutubePlayerModule,
    AppRoutingModule,
    MdTabsModule,
    HttpModule
  ],
  providers: [
    UsersService,
    AuthService,
    LoginGuard,
    HubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
