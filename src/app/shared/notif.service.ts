import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MedalE } from '../enums/medalE';

@Injectable()
export class NotifService {
  public notifCount = 0;
  constructor(public db: AngularFireDatabase,) { }

  addFriendRequest(user, friend) {
    firebase.database().ref("/Notifs/" + friend + "/Friend/" + user).set(0);
  }

  addMedalNotif(user, medal) {
    firebase.database().ref("/Notifs/" + user + "/Medal/" + medal).set(0);
  }

  addKickedNotif(user, hub) {
    firebase.database().ref("/Notifs/" + user + "/Kick/" + hub).set(0);
  }

  getFriendNotifs(user) {
    return this.db.list("/Notifs/" + user + "/Friend");
  }

  getMedalNotifs(user) {
    return this.db.list("/Notifs/" + user + "/Medal");
  }

  getKickedNotifs(user) {
    return this.db.list("/Notifs/" + user + "/Kick");
  }

  acceptFriend(user, friend) {
    firebase.database().ref("/Friends/" + user).child(friend).set(0);
    firebase.database().ref("/Friends/" + friend).child(user).set(0);
    firebase.database().ref("Notifs/" + user + "/Friend/" + friend).remove();
  }

  declineFriend(user, friend) {
    firebase.database().ref("Notifs/" + user + "/Friend/" + friend).remove();
  }

  dismissMedal(user, genType, medal) {
    firebase.database().ref("Medals/Users/" + user + "/" + medal).set(MedalE.Dismissed);
    firebase.database().ref("Notifs/" + user + "/Medal/" + medal).remove();
  }

  dismissMedalHub(user, hub, genType, medal) {
    firebase.database().ref("Medals/Hubs/" + hub + "/" + medal).set(MedalE.Dismissed);
    firebase.database().ref("Notifs/" + user + "/Medal/" + medal).remove();
  }

  dismissKicked(user, hub) {
    firebase.database().ref("Notifs/" + user + "/Kick/" + hub).remove();
  }


  medalNotifUser(user, type) {
    firebase.database().ref("Notifs/" + user + "/Medal/" + type).set(0);
  }

  medalNotifHub(user, hub, type) {
    firebase.database().ref("Notifs/" + user + "/Medal/" + type).set(hub);
  }
}
