import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { User } from '../objects/user';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState() {
    return this.authState;
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()).then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        this.currentUser = user;
        var usersRef = firebase.database().ref('Users');
        usersRef.child(user.uid).set({
          active: true,
          email: user.email,
          kicked: false,
          last_active: Date.now(),
          username: "guest",
          hubs: {
          }
        });
      });
  }
  
  logoutWithGoogle() {
    return this.afAuth.auth.signOut().then((result) => {
      this.currentUser = null;
    });
  }
  
  getCurrentUser() { return this.currentUser; }

}
