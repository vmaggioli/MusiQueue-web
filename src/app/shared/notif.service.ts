import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class NotifService {

  constructor(public db: AngularFireDatabase,) { }

  addFriendRequest(user, friend) {
    firebase.database().ref("/Notifs/" + friend + "/friend").child(user).set(false);
  }

  getUserNotifs(user) {
    return this.db.list("/Notifs/" + user + "/friend");
  }

  acceptFriend(user, friend) {
    console.log("entered");
    firebase.database().ref("/Friends/" + user).child(friend).set(false);
    firebase.database().ref("/Friends/" + friend).child(user).set(false);
    firebase.database().ref("Notifs/" + user + "/friend/" + friend).remove();
  }

  declineFriend(user, friend) {
    firebase.database().ref("Notifs/" + user + "/friend/" + friend).remove();
  }

}
