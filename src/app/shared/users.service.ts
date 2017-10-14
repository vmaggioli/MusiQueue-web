import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


import { User } from '../objects/user';

@Injectable()
export class UsersService {
  public allUsers: FirebaseListObservable<User[]>;
  public hubUserKeys: FirebaseListObservable<any[]>;
  public hubUsers: FirebaseListObservable<User[]>;
  public hubUser: FirebaseObjectObservable<User>;
  public currentUser: User;

  constructor(public db: AngularFireDatabase) {
    this.allUsers = db.list('/Users');
  }

  userIsPartOfHub(userID: string, hubUID: string) {
    this.db.list("Users/" + userID + "hub_list", {preserveSnapshot:true}).subscribe(hubs => {
      hubs.forEach(hub => {
        if (hub.val().name == hubUID) {
          return true;
        }
      });
    });
    return false;
  }

  addUserToHub(userID: string, hubUID: string) {
    var date = Date.now();
    this.db.object('Users/' + userID, {preserveSnapshot:true}).subscribe(u => {
      var hub = firebase.database().ref("Hubs/" + hubUID);
      hub.child("/users/" + userID).update({
        uid: userID,
        active: u.val().active,
        email: u.val().email,
        kicked: u.val().kicked,
        last_active: date,
        username: "guest"
      });
    });
  }

  addHubUnderUser(userID: string, hubUID: string) {
    var date = Date.now();
    var userRef = firebase.database().ref("Users/" + userID);
    if (!this.userIsPartOfHub(userID, hubUID)) {
      this.db.object("Hubs/" + hubUID, {preserveSnapshot:true}).subscribe(newHub => {
        userRef.child("hub_list/" + hubUID).set({
          closed: newHub.val().closed,
          creator: newHub.val().creator,
          last_active: date,
          latitude: newHub.val().latitude,
          longitude: newHub.val().longitude,
          name: newHub.val().name,
          pin: newHub.val().pin,
          //users: this.auth.getCurrentUser().displayName,
          wifi: newHub.val().wifi
        });
      });
    } else {
      userRef.child("hub_list/" + hubUID).update({
        last_active: date
      });
    }
}

  updateUsername(userId: string, username: string) {
    var userRef = firebase.database().ref("Users/" + userId);
    userRef.update({
      username: username
    });
  }

  removeUserFromHub(userID: string, hubUID: string) {
    this.db.object("Users/" + userID + "/hub_list/" + hubUID).remove();
  }

  getHubUsers(hubUID: string) {
    return this.db.list("Hubs/" + hubUID + "/users");
  }

  getRecentHubs() {
    var date = Date.now();
    var maxTimeSinceActivity = date - (7 * 24 * 60 * 60 * 1000);
    return this.db.list("Users/" + this.currentUser.uid + "/hub_list", {
      query: {
        orderByChild: "last_active",
        startAt: maxTimeSinceActivity,
        endAt: date
      }
    });
  }

}
