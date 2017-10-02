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
  public hubUsers: FirebaseListObservable<User[]> = [];
  public hubUser: FirebaseObjectObservable<User>;
  public currentUser: User;

  constructor(public db: AngularFireDatabase) {
    this.allUsers = db.list('/Users');
  }

  
  addUserToHub(userID: string, hubUID: string) {
    this.db.object('Users/' + userID, {preserveSnapshot:true}).subscribe(u => {
      var isPresent = false;
      this.hubUsers.forEach(hu => {
        hu.forEach(ahu => {
          if (u.email == ahu.email) {
            isPresent = true;
            ahu.username = u.val().username;
          }
        });
      });
      if (!isPresent) {
        var hub = firebase.database().ref("Hubs/" + hubUID);
        hub.child("/users/" + userID).set({
          uid: userID,
          active: u.val().active,
          email: u.val().email,
          kicked: u.val().kicked,
          last_active: u.val().last_active,
          username: "guest"
        });
      }
    });
  }
  
  removeUserFromHub(userID: string, hubUID: string) {
    this.db.object("Hubs/" + hubUID + "/users/" + userID).remove();
    return getHubUsers(hubUID);
  }

  getHubUsers(hubUID: string) {
    this.hubUsers = [];
    this.db.list("Hubs/" + hubUID + "/users").subscribe(users => {
      users.forEach(user => {
        this.hubUsers.push(user);
      });
    });
    return this.hubUsers;
  }
}
