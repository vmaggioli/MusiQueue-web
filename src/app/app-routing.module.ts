import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { LoginGuard } from './shared/login-guard.module';

import { HubMainComponent } from './hub-main/hub-main.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HubUsersComponent } from './hub-users/hub-users.component';
import { CreateJoinComponent } from './create-join/create-join.component';
import { CreateHubComponent } from './create-hub/create-hub.component';
import { JoinHubComponent } from './join-hub/join-hub.component';
import { UserHubViewComponent } from './user-hub-view/user-hub-view.component';
import { HubLoginComponent } from './hub-login/hub-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OwnedHubsComponent } from './owned-hubs/owned-hubs.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HowToComponent } from './how-to/how-to.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { HubProfileComponent } from './hub-profile/hub-profile.component';
import { HubProfileFormComponent } from './hub-profile-form/hub-profile-form.component';
import { MedalsComponent } from './medals/medals.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
  { path: 'hub-main', component: HubMainComponent, canActivate: [LoginGuard] },
  { path: 'hub-main/users', component: HubUsersComponent, canActivate: [LoginGuard] },
  { path: 'create-join', component: CreateJoinComponent, canActivate: [LoginGuard] },
  { path: 'create-hub', component: CreateHubComponent, canActivate: [LoginGuard] },
  { path: 'join-hub', component: JoinHubComponent, canActivate: [LoginGuard] },
  { path: 'user-hub-view', component: UserHubViewComponent, canActivate: [LoginGuard]},
  { path: 'hub-login/:name', component: HubLoginComponent, canActivate: [LoginGuard]},
  { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [LoginGuard]},
  { path: 'owned-hubs/:name', component: OwnedHubsComponent, canActivate: [LoginGuard]},
  { path: 'notifications/:name', component: NotificationsComponent, canActivate: [LoginGuard]},
  { path: 'how-to', component: HowToComponent, canActivate: [LoginGuard]},
  { path: 'leaderboards', component: LeaderboardsComponent, canActivate: [LoginGuard]},
  { path: 'profile-form/:name', component: ProfileFormComponent, canActivate: [LoginGuard]},
  { path: 'hub-profile/:name', component: HubProfileComponent, canActivate: [LoginGuard]},
  { path: 'hub-profile-form/:name', component: HubProfileFormComponent, canActivate: [LoginGuard]},
  { path: 'medals/:name', component: MedalsComponent, canActivate: [LoginGuard]},
]
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
