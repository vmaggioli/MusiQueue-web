import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'lsl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  topics: FirebaseListObservable<any[]>;
  title = 'MusiQueue-web';
  user = null;
  loggedIn: false;

  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
      if (this.user != null)
        this.loggedIn = true;
      this.topics = this.db.list('/topics');
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then((result) => {
      console.log(this.auth.getCurrentUser());
      if (this.auth.getCurrentUser() != null) {
        this.loggedIn = true; 
      }    
    });
  }
  
  logoutWithGoogle() {
    this.auth.logoutWithGoogle().then((result) => {
      console.log(this.auth.getCurrentUser());
      if (this.auth.getCurrentUser() == null) { 
        this.loggedIn = false; 
      } 
    });
  }

}
