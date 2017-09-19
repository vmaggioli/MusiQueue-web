import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HubMainComponent } from './hub-main/hub-main.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HubUsersComponent } from './hub-users/hub-users.component';
import { CreateJoinComponent } from './create-join/create-join.component';
import { CreateHubComponent } from './create-hub/create-hub.component';
import { JoinHubComponent } from './join-hub/join-hub.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
  { path: 'hub-main', component: HubMainComponent },
  { path: 'hub-main/users', component: HubUsersComponent },
  { path: 'create-join', component: CreateJoinComponent },
  { path: 'create-hub', component: CreateHubComponent },
  { path: 'join-hub', component: JoinHubComponent }
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
