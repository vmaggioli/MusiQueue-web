import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class NotifService {

  constructor(public db: AngularFireDatabase,) { }

  addFriendRequest(user, friend) {
    firebase.database().ref("/Notifs/" + friend + "/friend" + user).set(false);
  }

  addMedalNotif(user, medal) {
    firebase.database().ref("/Notifs/" + user + "/medal" + medal).set(false);
  }

  addKickedNotif(user, hub) {
    firebase.database().ref("/Notifs/" + user + "/kick" + hub).set(false);
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
    firebase.database().ref("/Friends/" + user).child(friend).set(false);
    firebase.database().ref("/Friends/" + friend).child(user).set(false);
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
}
