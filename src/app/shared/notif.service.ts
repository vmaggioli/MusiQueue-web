import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MedalE } from '../enums/medalE';

@Injectable()
export class NotifService {

  constructor(public db: AngularFireDatabase,) { }

  addFriendRequest(user, friend) {
    firebase.database().ref("/Notifs/" + friend + "/friend/" + user).set(0);
  }

  addMedalNotif(user, medal) {
    firebase.database().ref("/Notifs/" + user + "/medal/" + medal).set(0);
  }

  addKickedNotif(user, hub) {
    firebase.database().ref("/Notifs/" + user + "/kick/" + hub).set(0);
  }

  getFriendNotifs(user) {
    return this.db.list("/Notifs/" + user + "/friend");
  }

  getMedalNotifs(user) {
    return this.db.list("/Notifs/" + user + "/medal");
  }

  getKickedNotifs(user) {
    return this.db.list("/Notifs/" + user + "/kick");
  }

  acceptFriend(user, friend) {
    firebase.database().ref("/Friends/" + user).child(friend).set(0);
    firebase.database().ref("/Friends/" + friend).child(user).set(0);
    firebase.database().ref("Notifs/" + user + "/friend/" + friend).remove();
  }

  declineFriend(user, friend) {
    firebase.database().ref("Notifs/" + user + "/friend/" + friend).remove();
  }

  dismissMedal(user, medal) {
    firebase.database().ref("Notifs/" + user + "/medal/" + medal).remove();
  }

  dismissKicked(user, hub) {
    firebase.database().ref("Notifs/" + user + "/kick/" + hub).remove();
  }


  friendNotif(user, type) {
    firebase.database().ref("Notifs/" + user + "/medal/" + type).set(0);
  }
}
