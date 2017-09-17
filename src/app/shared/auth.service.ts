import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
				console.log("setting current user\n");
        this.currentUser = user;
        this.createUser();
      } else {
        this.currentUser = null;
      }
    });
  }

  /**
   *  This function will create a user in the database and set his/her key
   *  equal to the unique id that firebase generates after siging up
   *  general default values are also set, but the username will need to be
   *  updated later
   */
  createUser() {
    var usersRef = firebase.database().ref('Users');
    var userRef = usersRef.push(this.currentUser.uid);
    console.log("creating User\n");
    userRef.set({
      'username': 'guest',
      'active': true,
      'kicked': false,
      'last_active': new Date(),
      'email': this.currentUser.email
    });
  }

  getAuthState() {
    return this.authState;
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider());
  }
}
