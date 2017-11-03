import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';


import { User } from '../objects/user';

@Injectable()
export class UsersService {
  public allUsers: FirebaseListObservable<User[]>;
  public hubUserKeys: FirebaseListObservable<any[]>;
  public hubUsers: FirebaseListObservable<User[]>;
  public hubUser: FirebaseObjectObservable<User>;
  public currentUser: User;

  constructor(public db: AngularFireDatabase,
              public route: ActivatedRoute,
              public router: Router
            ) {
    this.allUsers = db.list('/Users');
  }

  setUsername(id) {
    firebase.database().ref("Users/" + id).once("value", u => {
      this.currentUser.username = u.val().username;
    });
  }

  getUserById(id) {
    return this.db.object("Users/" + id);
  }

  listenForBoot() {
    firebase.database().ref("Users/" + this.currentUser.uid + "/hub_list").on("child_removed", hub => {
      let i : number = this.router.url.indexOf('=');
      let name = this.router.url.substring(i+1);

        if (name != undefined && name != null && name == hub.val().name) {
          this.router.navigate(['create-join']);
          confirm("You have been kicked out of the Hub: " + name);
        }
      });
  }

  userIsPartOfHub(userID: string, hubUID: string) {
    var ref = firebase.database().ref("Users/" + userID + "hub_list/" + hubUID);
    var isMember = true;
    ref.transaction(function(user) {
      if (user == null)
        isMember = false;
    });
    return isMember;
  }

  addUserToHub(userID: string, hubUID: string) {
    var date = Date.now();
    var ref = firebase.database().ref('Users/' + userID)
    ref.once("value", u => {
      var hub = firebase.database().ref("Hubs/" + hubUID);
      hub.child("/users/" + userID).update({
        uid: userID,
        active: u.val().active,
        email: u.val().email,
        kicked: u.val().kicked,
        last_active: date,
        username: u.val().username
      });
    });
  }

  addHubUnderUser(userID: string, hubUID: string) {
    var date = Date.now();
    var userRef = firebase.database().ref("Users/" + userID);
    if (!this.userIsPartOfHub(userID, hubUID)) {
      var ref = firebase.database().ref("Hubs/" + hubUID);
      ref.once("value", newHub => {
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

  addToKickedList(hub: string, user: string) {
    firebase.database().ref("/Users/" + user + "/kicked_list").push(hub);
  }

}
