import { MedalE } from '../enums/medalE';
import { FriendMedal } from './friendMedal';
import { HubMedal } from './hubMedal';
import { VoteMedal } from './voteMedal';
import { RankMedal } from './rankMedal';
import { CountMedal } from './countMedal';
import { MiscMedal } from './miscMedal';

export class Medal {
  public friendMedals: FriendMedal[];
  public hubMedals: HubMedal[];
  public voteMedals: VoteMedal[];
  public rankMedals: RankMedal[];
  public countMedals: CountMedal[];
  public miscMedals: MiscMedal[]];

  public constructor() {
    this.friendMedals = [];
    this.hubMedals = [];
    this.voteMedals = [];
    this.rankMedals = [];
    this.countMedals = [];
    this.miscMedals = [];

    let i = 0;

    for (i = MedalE.FriendType.Min; i <= MedalE.FriendType.Max; i++) {
      this.friendMedals.push(new FriendMedal(i));
    }

    for (i = MedalE.HubType.Min; i <= MedalE.HubType.Max; i++) {
      this.hubMedals.push(new HubMedal(i));
    }

    for (i = MedalE.VoteType.Min; i <= MedalE.VoteType.Max; i++) {
      this.voteMedals.push(new VoteMedal(i));
    }

    for (i = MedalE.RankType.Min; i <= MedalE.RankType.Max; i++) {
      this.rankMedals.push(new RankMedal(i));
    }

    for (i = MedalE.CountType.Min; i <= MedalE.CountType.Max; i++) {
      this.countMedals.push(new CountMedal(i));
    }

    for (i = MedalE.MiscellaneousType.Min; i <= MedalE.MiscellaneousType.Max; i++) {
      this.miscMedals.push(new MiscMedal(i));
      console.log(this.miscMedals[i - 500]);
    }
  }
}
