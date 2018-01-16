import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'firebase/storage';

@Injectable()
export class MedalService {
  public allMedals: any[];

  constructor(public db: AngularFireDatabase,) { }

  __setMedalPic(pic) {
    let storageRef = firebase.storage().ref();
    let medalImageRef = storageRef.child("images/medals/default");
    medalImageRef.putString(pic, 'base64');
  }

  getMedalPic(medal) {
    return firebase.storage().ref("images/medals/" + medal).getDownloadURL();
  }

  getUserMedals(user) {

  }

  getFriendMedals() {
    return this.allMedals.friendMedals;
  }

  getHubMedals() {
    return this.allMedals.hubMedals;
  }

  getVoteMedals() {
    return this.allMedals.voteMedals;
  }

  getRankMedals() {
    return this.allMedals.rankMedals;
  }

  getCountMedals() {
    return this.allMedals.countMedals;
  }

  getMiscMedals() {
    return this.allMedals.miscMedals;
  }

  getAllMedals() {
    let all = [];
    all = all.concat(this.allMedals.friendMedals);
    all = all.concat(this.allMedals.hubMedals);
    return all;
  }
}
