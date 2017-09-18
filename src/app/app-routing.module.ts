import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HubMainComponent } from './hub-main/hub-main.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: 'hub-main', component: HubMainComponent },
  { path: '', component: HomeComponent }
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
