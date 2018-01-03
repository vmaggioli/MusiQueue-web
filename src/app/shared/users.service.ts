import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'firebase/storage';

import { User } from '../objects/user';

@Injectable()
export class UsersService {
  public hubUserKeys: FirebaseListObservable<any[]>;
  public hubUsers: FirebaseListObservable<User[]>;
  public hubUser: FirebaseObjectObservable<User>;
  public currentUser: User;

  constructor(public db: AngularFireDatabase,
              public route: ActivatedRoute,
              public router: Router
            ) {
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
    firebase.database().ref("Hubs/" + hubUID).child("/users/" + userID).update({
      last_active: Date.now()
    });
  }

  addHubUnderUser(userID: string, hubUID: string) {
    var userRef = firebase.database().ref("Users/" + userID).child("hub_list/" + hubUID).update({
        last_active: date
      });
    }


  updateUsername(userId: string, username: string) {
    var userRef = firebase.database().ref("Users/" + userId);
    userRef.update({
      username: username
    });
  }

  updateUserActivity(userId: string, hubId: string) {
    var userRef = firebase.database().ref("Users/" + userId + "/hub_list/" + hubId);
    userRef.update({
      last_active: Date.now();
    })
  }

  removeUserFromHub(userID: string, hubUID: string) {
    this.db.object("Users/" + userID + "/hub_list/" + hubUID).remove();
  }

  getRecentHubs() {
    var date = Date.now();
    var maxTimeSinceActivity = date - (7 * 24 * 60 * 60 * 1000); // 1 week
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

  updatePic(user: string, pic: string) {
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('images/' + user);
    imagesRef.putString(pic, 'base64');
  }

  getPic(user: string): FirebaseObservable {
    return firebase.storage().ref().child('images/' + user).getDownloadURL();
  }

  updateProfile(user, username, location) {
    this.currentUser.location = location;
    this.currentUser.username = username;
    firebase.database().ref("/Users/" + user).update({
      username: username,
      location: location
    });
  }
}
