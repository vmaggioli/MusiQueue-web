import { MedalE } from '../enums/medalE';
import { FriendMedal } from './friendMedal';
import { HubMedal } from './hubMedal';
import { VoteMedal } from './voteMedal';
import { RankMedal } from './rankMedal';
import { CountMedal } from './countMedal';
import { MiscMedal } from './miscMedal';
import { IMedalMap } from '../interfaces/IMedalMap';

export class Medal {
  // maps for constant lookup time
  public friendMedals: IMedalMap<FriendMedal> = {};
  public hubMedals: IMedalMap<HubMedal> = {};
  public voteMedals: IMedalMap<VoteMedal> = {};
  public rankMedals: IMedalMap<RankMedal> = {};
  public countMedals: IMedalMap<CountMedal> = {};
  public miscMedals: IMedalMap<MiscMedal> = {};

  // arrays for ngFor loops
  public friendMedalArr: any = [];
  public hubMedalArr: any = [];
  public voteMedalArr: any = [];
  public rankMedalArr: any = [];
  public countMedalArr: any = [];
  public miscMedalArr: any = [];


  public constructor() {
    let i = "00";

    for (i = MedalE.FriendType.Min; i != MedalE.FriendType.Max; i = this.getNextKey(i)) {
      let friend = new FriendMedal(i);
      this.friendMedals[i] = friend;
      this.friendMedalArr.push(friend);
    }

    for (i = MedalE.HubType.Min; i != MedalE.HubType.Max; i = this.getNextKey(i)) {
      let hub = new HubMedal(i);
      this.hubMedals[i] = hub;
      this.hubMedalArr.push(hub);
    }

    for (i = MedalE.VoteType.Min; i != MedalE.VoteType.Max; i = this.getNextKey(i)) {
      let vote = new VoteMedal(i);
      this.voteMedals[i] = vote;
      this.voteMedalArr.push(vote);
    }

    for (i = MedalE.RankType.Min; i != MedalE.RankType.Max; i = this.getNextKey(i)) {
      let rank = new RankMedal(i);
      this.rankMedals[i] = rank;
      this.rankMedalArr.push(rank);
    }

    for (i = MedalE.CountType.Min; i != MedalE.CountType.Max; i = this.getNextKey(i)) {
      let count = new CountMedal(i);
      this.countMedals[i] = count;
      this.countMedalArr.push(count);
    }

    for (i = MedalE.MiscellaneousType.Min; i != MedalE.MiscellaneousType.Max; i = this.getNextKey(i)) {
      let misc = new MiscMedal(i);
      this.miscMedals[i] = misc;
      this.miscMedalArr.push(misc);
    }
  }


  getNextKey(key: string) {
    let first = key.charAt(0);
    let second = key.charAt(1);

    switch(second) {
      case '9':
        key = first + 'a';
        break;
      case 'z':
        key = first + 'A';
        break;
      case 'Z':
        switch(first) {
          case '9':
            key = "a0";
            break;
          case 'z':
            key = "A0";
            break;
          case 'Z':
            key = "EOF";
            break;
          default:
            key = String.fromCharCode(first.charCodeAt(0) + 1) + '0';
            break;
        }
        break;
      default:
        key = first + String.fromCharCode(second.charCodeAt(0) + 1);
    }
    return key;
  }
}
