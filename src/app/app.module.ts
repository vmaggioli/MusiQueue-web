import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AuthService } from './shared/auth.service';
//import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
//    AngularFireModule.initializeApp(environment.firebase, 'MusiQueue-web'),
//    AngularFireDatabaseModule,
//    AngularFireAuthModule
  ],
//  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
