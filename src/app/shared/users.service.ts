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

  // this implementation FAILS to update automatically if a user is removed from the hub
  addUserByID(id) {
    this.db.object('Users/' + id.val(), {preserveSnapshot:true}).subscribe(u => {
      var isPresent = false;
      this.hubUsers.forEach(hu => {
        hu.forEach(ahu => {
          if (u.email == ahu.email) {
            isPresent = true;
            ahu.username = u.val().username;
          }
        });
      });
      if (!isPresent)
        this.hubUsers.push(u.val());
    });
    return this.hubUsers;
  }

  getHubUsers(hubUID: string) {
    var hubsRef = firebase.database().ref('Hubs/' + hubUID + '/users');
    this.hubUserKeys = this.db.list('Hubs/' + hubUID + '/users', {preserveSnapshot:true});
    this.hubUserKeys.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.addUserByID(snapshot);
      })
    });
    return this.hubUsers;
  }
}
