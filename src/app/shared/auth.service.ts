import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './users.service'

import { User } from '../objects/user';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
constructor(public afAuth: AngularFireAuth, public usersService: UsersService) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        if (this.usersService.currentUser) {
          this.usersService.currentUser.email = user.email;
          this.usersService.currentUser.uid = user.uid;
          this.usersService.currentUser.last_active = Date.now();
        }
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
        var usersRef = firebase.database().ref('Users');
        var date = Date.now();
        this.usersService.currentUser.email = result.user.email;
        this.usersService.currentUser.uid = result.user.uid;
        this.usersService.currentUser.last_active = Date.now();
        usersRef.child(result.user.uid).update({
          uid: result.user.uid,
          active: true,
          email: result.user.email,
          kicked: false,
          last_active: date,
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
