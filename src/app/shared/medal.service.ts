import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'firebase/storage';
import { MedalE } from '../enums/medalE';
import { NotifService } from '../shared/notif.service';

@Injectable()
export class MedalService {
  public allMedals: any[];
  public firstInit: boolean = true;

  constructor(
    public db: AngularFireDatabase,
    public notifService: NotifService,
    ) { }

  __setMedalPic(pic) {
    let storageRef = firebase.storage().ref();
    let medalImageRef = storageRef.child("images/medals/default");
    medalImageRef.putString(pic, 'base64');
  }

  getMedalPic(medal) {
    return firebase.storage().ref("images/medals/" + medal).getDownloadURL();
  }

  initListeners(userId) {
    this.firstInit = false;
    firebase.database().ref("Friends/" + userId).on('child_added', snap => {
      let ct = 0;
      snap.forEach(s => {
        ct++;
      });
      switch(ct) {
        case 0:
          this.handleFriendMark(userId, MedalE.FriendType.One);
          break;
        case 1:
          this.handleFriendMark(userId, MedalE.FriendType.One);
          break;
        case 10:
          this.handleFriendMark(userId, MedalE.FriendType.Ten);
          break;
        case 25:
          this.handleFriendMark(userId, MedalE.FriendType.TwentyFive);
          break;
        case 50:
          this.handleFriendMark(userId, MedalE.FriendType.Fifty);
          break;
        case 100:
          this.handleFriendMark(userId, MedalE.FriendType.OneHundred);
          break;
        case 200:
          this.handleFriendMark(userId, MedalE.FriendType.TwoHundred);
          break;
        case 500:
          this.handleFriendMark(userId, MedalE.FriendType.FiveHundred);
          break;
        case 1000:
          this.handleFriendMark(MedalE.FriendType.OneThousand);
          break;
        case 2000:
          this.handleFriendMark(MedalE.FriendType.TwoTHousand);
          break;
        case 5000:
          this.handleFriendMark(MedalE.FriendType.FiveThousand);
          break;
        case 10000:
          this.handleFriendMark(MedalE.FriendType.TenThousand);
          break;
        case 50000:
          this.handleFriendMark(MedalE.FriendType.FiftyThousand);
          break;
        case 100000:
          this.handleFriendMark(MedalE.FriendType.OneHundredThousand);
          break;
      }
    });
  }

  handleFriendMark(userId, type) {
    this.notifService.friendNotif(userId, type);
    firebase.database().ref("Medals/" + userId + "/Friend/" + type).set(0);
  }

  getMedal(type) {
    let category = this.getCategory(type);
    switch(category) {
      case MedalE.IsFriend:
        return this.allMedals.friendMedals[type];
        break;
      case MedalE.IsHub:
        return this.allMedals.hubMedals[type];
        break;
      case MedalE.IsVote:
        return this.allMedals.voteMedals[type];
        break;
      case MedalE.IsRank:
        return this.allMedals.rankMedals[type];
        break;
      case MedalE.IsCount:
        return this.allMedals.countMedals[type];
        break;
      case MedalE.IsMisc:
        return this.allMedals.miscMedals[type];
        break;
    }
  }

  getCategory(type) {
    if (type < MedalE.FriendType.Max)
      return MedalE.IsFriend;
    else if (type < MedalE.HubType.Max)
      return MedalE.IsHub;
    else if (type < MedalE.VoteType.Max)
      return MedalE.IsVote;
    else if (type < MedalE.RankType.Max)
      return MedalE.IsRank;
    else if (type < MedalE.CountType.Max)
      return MedalE.IsCount;
    else if (type < MedalE.MiscellaneousType.Max)
      return MedalE.IsMisc;
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

  getFriendMedalArr() {
    return this.allMedals.friendMedalArr;
  }

  getHubMedalArr() {
    return this.allMedals.hubMedalArr;
  }

  getVoteMedalArr() {
    return this.allMedals.voteMedalArr;
  }

  getRankMedalArr() {
    return this.allMedals.rankMedalArr;
  }

  getCountMedalArr() {
    return this.allMedals.countMedalArr;
  }

  getMiscMedalArr() {
    return this.allMedals.miscMedalArr;
  }
}
