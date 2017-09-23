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


const appRoutes: Routes = [
  { path: '', component: HomeComponent }
  { path: 'hub-main', component: HubMainComponent, canActivate: [LoginGuard] },
  { path: 'hub-main/users', component: HubUsersComponent, canActivate: [LoginGuard] },
  { path: 'create-join', component: CreateJoinComponent, canActivate: [LoginGuard] },
  { path: 'create-hub', component: CreateHubComponent, canActivate: [LoginGuard] },
  { path: 'join-hub', component: JoinHubComponent, canActivate: [LoginGuard] },
  { path: 'user-hub-view', component: UserHubViewComponent, canActivate: [LoginGuard]},
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
