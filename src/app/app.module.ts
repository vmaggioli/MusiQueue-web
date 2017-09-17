import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';
import { environment } from '../environments/environment';

export const firebaseConfig = {
  apiKey: 'AIzaSyAgvdKA3CBSgY3Oaooi8TDh4gA0iQgg5Ok',
  authDomain: 'musiqueue-web.firebaseapp.com',
  databaseURL: 'https://musiqueue-web.firebaseio.com',
  projectID: 'musiqueue-web',
  storageBucket: 'musiqueue-web.appspot.com',
  messagingSenderID: '386642263895'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'MusiQueue-web'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
