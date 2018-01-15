import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'firebase/storage';

@Injectable()
export class MedalService {

  constructor(public db: AngularFireDatabase,) { }

  __setMedalPic(pic) {
    let storageRef = firebase.storage().ref();
    let medalImageRef = storageRef.child("images/medals/default");
    medalImageRef.putString(pic, 'base64');
  }

  getMedalPic(medal) {
    return firebase.storage().ref("images/medals/" + medal).getDownloadURL();
  }

}
