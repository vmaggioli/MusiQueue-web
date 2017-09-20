import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';


import { User } from '../objects/user';

@Injectable()
export class UsersService {
  public allUsers: FirebaseListObservable<any[]>;
  public hubUserKeys: FirebaseListObservable<any[]>;
  public hubUsers: FirebaseListObservable<any[]> = [];
  public hubUser: FirebaseObjectObservable<any>;

  constructor(public db: AngularFireDatabase) {
    this.allUsers = db.list('/Users');
  }

  getAllUsers(): User[] {
    return this.allUsers;
  }


  // this implementation FAILS to update automatically if a user is removed from the hub
  addUserByID(id: any) {
    this.hubUser = this.db.object('Users/' + id.val(), {preserveSnapshot:true}).subscribe(u => {
      var isPresent = false;
      this.hubUsers.forEach(hu => {
        if (u.val().email == hu.email) {
          isPresent = true;
          hu.username = u.val().username;
        }
      })
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