import { Friend } from './friend';
import { Hub } from './hub';
import { Vote } from './vote';
import { Rank } from './rank';
import { Count } from './count';
import { Miscellaneous } from './miscellaneous';

export enum MedalE {
  /*
   *  Each enumeration is a two byte string.
   *  Each byte can be the one of 62 different characters
   *      0 - 9: 10 characters
   *      a - z: 26 characters
   *      A - Z: 26 characters
   *  Each of the following Types are alotted 310 enumereations
   *      5 * 62 = 310
   *      5 from the first bytes, 62 from the second byte
   *  Doing it this way will enable minimal database storage while
   *  still allowing for constant lookup time and the ability to
   *  expand all enumeration types later without changing the
   *  organization of the code
   */
  FriendType = Friend,                // 00 - 4Z  -->     0 - 309
  HubType = Hub,                      // 50 - 9Z  -->   310 - 619
  VoteType = Vote,                    // a0 - eZ  -->   620 - 929
  RankType = Rank,                    // f0 - jZ  -->  930 - 1239
  CountType = Count,                  // k0 - oZ  --> 1240 - 1549
  MiscellaneousType = Miscellaneous,  // p0 - uZ  --> 1550 - 1859

  IsFriend = 0,
  IsHub = 1,
  IsVote = 2,
  IsRank = 3,
  IsCount = 4,
  IsMisc = 5,

  Dismissed = 1,
}
