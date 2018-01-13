import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { HubService } from './hub.service';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class RankingService {

  constructor(
    usersService: UsersService,
    hubService: HubService,
  ) { }


  initUserScores(user) {
    firebase.database().ref("Rankings/Users/" + user).once('value', u => {
      firebase.database().ref("Rankings/Users/" + user).update({
        upvotes: (u.val() == null || u.val().upvotes == undefined) ? 0 : u.val().upvotes,
        downvotes: (u.val() == null || u.val().downvotes == undefined) ? 0 : u.val().downvotes,
        medal_count: (u.val() == null || u.val().medal_count == undefined) ? 0 : u.val().medal_count,
        medal_score: (u.val() == null ||  u.val().medal_score == undefined) ? 0 : u.val().medal_score
      });
    });
  }

  initHubScores(hub) {
    firebase.database().ref("Rankings/Hubs/" + hub).once('value', h => {
      firebase.database().ref("Rankings/Hubs/" + hub).update({
        //upvotes: (h.val() == null || h.val().upvotes == undefined) ? 0 : h.val().upvotes,
        //downvotes: (h.val() == null || h.val().downvotes == undefined) ? 0 : h.val().downvotes,
        medal_count: (h.val() == null || h.val().medal_count == undefined) ? 0 : h.val().medal_count,
        medal_score: (h.val() == null ||  h.val().medal_score == undefined) ? 0 : h.val().medal_score
      });
    });
  }

  getUserScores(user) {
    return firebase.database().ref("Rankings/Users/" + user).once('value');
  }

  getHubScores(hub) {
    return firebase.database().ref("Rankings/Hubs/" + hub).once('value');
  }
}
