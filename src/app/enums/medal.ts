import { Friend } from './friend';
import { Hub } from './hub';
import { Vote } from './vote';
import { Rank } from './rank';
import { Count } from './count';
import { Miscellaneous } from './miscellaneous';

export enum Medal {
  FriendType = Friend,    // 0 - 12
  HubType = Hub,          // 13 - 32
  VoteType = Vote,        // 33 - 76, 101 - 122
  RankType = Rank,        // 77 - 100
  CountType = Count,      // 123 - 131
  MiscellaneousType = Miscellaneous, // 132
}
