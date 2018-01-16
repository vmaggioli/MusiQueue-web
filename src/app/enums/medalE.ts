import { Friend } from './friend';
import { Hub } from './hub';
import { Vote } from './vote';
import { Rank } from './rank';
import { Count } from './count';
import { Miscellaneous } from './miscellaneous';

export enum MedalE {
  FriendType = Friend,    // 0 - 12
  HubType = Hub,          // 100 - 119
  VoteType = Vote,        // 200 - 265
  RankType = Rank,        // 300 - 323
  CountType = Count,      // 400 - 412
  MiscellaneousType = Miscellaneous, // 500 - 502
}
