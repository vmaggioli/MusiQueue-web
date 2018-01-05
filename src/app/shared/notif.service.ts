import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class NotifService {

  constructor() { }

  addFriendRequest(user, friend) {
    firebase.database().ref("/Notifs/" + friend + "/friend").child(user).set(false);
  }
}
