import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'lsl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topics: FirebaseListObservable<any[]>;
  user = null;
  loggedIn: false;
  
  constructor(private auth: AuthService,
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
