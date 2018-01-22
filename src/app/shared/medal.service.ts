import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'firebase/storage';
import { MedalE } from '../enums/medalE';
import { NotifService } from '../shared/notif.service';
import { HubService } from '../shared/hub.service';
import { UsersService } from '../shared/users.service';
import { RankingService } from '../shared/ranking.service';



@Injectable()
export class MedalService {
  public allMedals: any[];
  public firstInit: boolean = true;

  constructor(
    public db: AngularFireDatabase,
    public notifService: NotifService,
    public hubService: HubService,
    public usersService: UsersService,
    public rankingService: RankingService,
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

    // USER GAINS NOTIFICATION
    firebase.database().ref("Notifs/" + userId + "/Medal").on('child_added', child => {
      this.notifService.notifCount++;
    });

    firebase.database().ref("Notifs/" + userId + "/Medal").on('child_removed', child => {
      this.notifService.notifCount--;
    });

    firebase.database().ref("Notifs/" + userId + "/Friend").on('child_added', child => {
      this.notifService.notifCount++;
    });

    firebase.database().ref("Notifs/" + userId + "/Friend").on('child_removed', child => {
      this.notifService.notifCount--;
    });

    firebase.database().ref("Notifs/" + userId + "/Kick").on('child_added', child => {
      this.notifService.notifCount++;
    });

    firebase.database().ref("Notifs/" + userId + "/Kick").on('child_removed', child => {
      this.notifService.notifCount--;
    });

    // FRIENDS
    firebase.database().ref("Friends/" + userId).on('value', snap => {
      let ct = 0;
      snap.forEach(s => {
        ct++;
      });
      switch(ct) {
        case 1:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.One);
          break;
        case 10:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.Ten);
          break;
        case 25:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.TwentyFive);
          break;
        case 50:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.Fifty);
          break;
        case 100:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.OneHundred);
          break;
        case 200:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.TwoHundred);
          break;
        case 500:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.FiveHundred);
          break;
        case 1000:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.OneThousand);
          break;
        case 2000:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.TwoTHousand);
          break;
        case 5000:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.FiveThousand);
          break;
        case 10000:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.TenThousand);
          break;
        case 50000:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.FiftyThousand);
          break;
        case 100000:
          this.handleUserMilestone(userId, MedalE.FriendType, MedalE.FriendType.OneHundredThousand);
          break;
      }
    });

    // HUBS
    firebase.database().ref("Users/" + userId + "/hub_list").on('value', snap => {
      let ownCt = 0;
      let joinCt = 0;
      let size = 0;
      snap.forEach(s => {size++;});
      let stopper = 0;
      snap.forEach(s => {
        this.hubService.getHubByNameOnce(s.key).then(hub => {
          if (hub.val().creator == userId)
            ownCt++;
          else
            joinCt++;
          stopper++;
          if (stopper == size)
            this.handleHubTypes(ownCt, joinCt, userId);
        });
        this.hubService.getHubUsersOnce(s.key).then(users => {
          let ct = 0;
          users.forEach(a => {
              ct++;
          });
          switch(ct) {
            case 2:
              this.handleHubMilestone(userId, s.key, MedalE.HubType, MedalE.HubType.SizeTwo);
              break;
            case 10:
              this.handleHubMilestone(userId, s.key, MedalE.HubType, MedalE.HubType.SizeTen);
              break;
            case 25:
              this.handleHubMilestone(userId, s.key, MedalE.HubType, MedalE.HubType.SizeTwentyFive);
              break;
            case 50:
              this.handleHubMilestone(userId, s.key, MedalE.HubType, MedalE.HubType.SizeFifty);
              break;
            case 100:
              this.handleHubMilestone(userId, s.key, MedalE.HubType, MedalE.HubType.SizeOneHundred);
              break;
            case 200:
              this.handleHubMilestone(userId, s.key, MedalE.HubType, MedalE.HubType.SizeTwoHundred);
              break;
            case 500:
              this.handleHubMilestone(userId, s.key, MedalE.HubType, MedalE.HubType.SizeFiveHundred);
              break;
            case 1000:
              this.handleHubMilestone(userId, s.key, MedalE.HubType, MedalE.HubType.SizeOneThousand);
              break;
          }
        });
      });
    });


    // VOTE - USER - UPVOTER
    firebase.database().ref("Rankings/Users/" + userId + "/upvoter").on('value', snap => {
      switch(snap.val()) {
        case 10:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterTen);
          break;
        case 50:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterFifty);
          break;
        case 200:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterTwoHundred);
          break;
        case 500:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterFiveHundred);
          break;
        case 1000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterOneThousand);
          break;
        case 2000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterTwoThousand);
          break;
        case 5000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterFiveThousand);
          break;
        case 10000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterTenThousand);
          break;
        case 25000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterTwentyFiveThousand);
          break;
        case 50000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterFiftyThousand);
          break;
        case 100000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVoterOneHundredThousand);
          break;
      }
    });

    // VOTE - USER - DOWNVOTER
    firebase.database().ref("Rankings/Users/" + userId + "/downvoter").on('value', snap => {
      switch(snap.val()) {
        case 10:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterTen);
          break;
        case 50:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterFifty);
          break;
        case 200:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterTwoHundred);
          break;
        case 500:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterFiveHundred);
          break;
        case 1000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterOneThousand);
          break;
        case 2000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterTwoThousand);
          break;
        case 5000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterFiveThousand);
          break;
        case 10000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterTenThousand);
          break;
        case 25000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterTwentyFiveThousand);
          break;
        case 50000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterFiftyThousand);
          break;
        case 100000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVoterOneHundredThousand);
          break;
      }
    });

    // VOTE - USER - UPVOTED
    firebase.database().ref("Rankings/Users/" + userId + "/upvotes").on('value', snap => {
      switch(snap.val()) {
        case 10:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedTen);
          break;
        case 50:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedFifty);
          break;
        case 200:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedTwoHundred);
          break;
        case 500:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedFiveHundred);
          break;
        case 1000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedOneThousand);
          break;
        case 2000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedTwoThousand);
          break;
        case 5000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedFiveThousand);
          break;
        case 10000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedTenThousand);
          break;
        case 25000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedTwentyFiveThousand);
          break;
        case 50000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedFiftyThousand);
          break;
        case 100000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.UpVotedOneHundredThousand);
          break;
      }
    });

    // VOTE - USER - DOWNVOTED
    firebase.database().ref("Rankings/Users/" + userId + "/downvotes").on('value', snap => {
      switch(snap.val()) {
        case 10:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedTen);
          break;
        case 50:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedFifty);
          break;
        case 200:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedTwoHundred);
          break;
        case 500:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedFiveHundred);
          break;
        case 1000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedOneThousand);
          break;
        case 2000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedTwoThousand);
          break;
        case 5000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedFiveThousand);
          break;
        case 10000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedTenThousand);
          break;
        case 25000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedTwentyFiveThousand);
          break;
        case 50000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedFiftyThousand);
          break;
        case 100000:
          this.handleUserMilestone(userId, MedalE.VoteType, MedalE.VoteType.DownVotedOneHundredThousand);
          break;
      }
    });

    // RANK - USER
    firebase.database().ref("Rankings/Users/" + userId).on('value', scores => {
      this.rankingService.getUserRanksOnce().then(ranks => {
        let ranksArray = [];
        let i = 0;

        ranks.forEach(rankItem => {
          ranksArray.push(rankItem.val());
          ranksArray[i].user = rankItem.key;
          i++;
        });

        ranksArray.sort((a, b) => {
          let aRank = a.upvotes - a.downvotes + a.medal_score;
          let bRank = b.upvotes - b.downvotes + b.medal_score;
          if (aRank < bRank) return 1;
          else if (aRank > bRank) return -1;
          else return 0;
        });

        // ONLY NEED TO CHECK FIRST 100 VALUES TO SEE IF USER DESERVES MEDAL
        let i = 0;
        let max = ranksArray.length > 100 ? 100 : ranksArray.length;
        for (; i < max; i++) {
          if (ranksArray[i].user == userId) {
            this.handleUserRankMedal(userId, i + 1);
            break;
          }
        }
      })
    });

    // RANK - HUB
    // MAY NOT WANT TO DO THIS:
    /**
      --- 1 ---
      MUST GET ALL HUBS AND GET THE SCORES OF EACH USER
      THEN ADD THOSE TO GETHER AND STORE THE RESULT IN THE HUBS SCORE VALUE IN THE DATABASE

      --- 2 ---
      THEN LISTEN TO EVERY CHANGE OF ANY USER SCORE VALUE AND RECALCULATE FOR THAT HUB
      THIS WILL ENSURE THAT WE ALWAYS HAVE THE RIGHT SCORE VALUE IN THE DATABASE

      --- 3 ---
      THEN WE NEED TO SET UP A LISTENER TO ALL OF THE CURRENT USER'S HUBS TO CHECK
      IF IT HAS EARNED A MEDAL-RECEIVING RANK. THIS IS DONE BY GRABBING ALL HUBS,
      THEN SORTING THEM AND FINALLY CHECKING IF THE CURRENT USER HAS HUBS WITHIN
      THE TOP 100 HUBS.

      (1) ONLY EXPENSIVE ONE TIME PER USER, WHEN THEY OPEN THE APP.
          THIS COULD CAUSE A LOT OF QUERIES AND DATABASE TRAFFIC THOUGH
      (2) THIS WILL CAUSE CONSTANT DATABASE TRAFFIC EVERY SECOND
      (3) THIS WILL END UP BEING WITHIN 1 AND 2 SO WE WILL ALREADY HAVE THE HUBS
          WILL JUST NEED TO SORT THEM WHICH IS NO BIG DEAL BECAUSE ASYNC

      --- CONCLUSION ---
      FIREBASE IS GOING TO FLIP OUT AT THIS MUCH TRAFFIC WHEN THERE IS A LARGE NUMBER
      OF USERS. THERE WILL BE SIGNIFICANT CHARGES FROM DATABASE STORAGE, SO HAVING ALL
      OF THESE LISTENERS IS LIKELY BAD. GOING TO GO AHEAD AND TRY IT AND SEE WHAT
      HAPPENS AS USER COUNT INCREASES. WORST CASE SCENARIO IS TO GET RID OF THE
      HIGH TRAFFIC MEDALS

      --- RESULTS ---
      AFTER IMPLEMENTATION, THERE WERE SO MANY CALLS TO THE DATABASE THAT A SINGLE
      PRINT STATEMNT WAS PRINTING OVER 600 TIMES. NOT ACCEPTABLE AT ANY LEVE

      --- ALTERNAMTE METHOD ---
      (1) STORE A HUB'S SCORE IN DATABASE
      (2) SET LISTENER FOR HUB'S USER SCORES
      (3) SET LISTENER FOR HUB ADDED
      (4) RESORT HUBS BASED ON SCORES AND GET TOP 100
     */
    // firebase.database().ref("Hubs").on('child_added', h => {
    //   this.hubService.getAllHubs().then(hubs => {
    //     // console.log("hub run");
    //     let hubArr = [];
    //     hubs.forEach(hub => {
    //       hubArr.push(hub.val());
    //       hubArr.hubStatList = [];
    //       this.hubService.getHubUsersOnce(hub.val().name).then(users => {
    //         users.forEach(user => {
    //           firebase.database().ref("Rankings/Users/" + user.key).on('value', scores => {
    //             // console.log("hub update");
    //             let found = false;
    //             let hubStats: any = {user: "", score: 0,};
    //             hubArr.hubStatList.forEach(stat => {
    //               if (stat.user == user.key) {
    //                 found = true;
    //                 // CURRENT - PREVIOUS = DELTA
    //                 stat.score += (scores.val().upvotes - scores.val().downvotes + scores.val().medal_score) - stat.score;
    //                 hubStats = stat;
    //               }
    //             });
    //             if (found == false) {
    //               hubStats.user = user.key;
    //               hubStats.score += scores.val().upvotes - scores.val().downvotes + scores.val().medal_score;
    //               hubArr.hubStatList.push(hubStats);
    //             }
    //             // ONLY CALCULATE THE NEW RANKING IF A USER'S SCORE CHANGES AFTER JOINING THE HUB
    //             else {
    //               // console.log("go to ranks");
    //               this.updateHubRanks(userId, hubArr);
    //             }
    //           });
    //         });
    //       });
    //     });
    //   });
    // });

    // COUNT - USER
    firebase.database().ref("Medals/Users/" + userId + "/total").on('value', snap => {
      switch(snap.val()) {
        case 10:
          this.handleUserMilestone(userId, MedalE.CountType, MedalE.CountType.UserMedalCountTen);
          break;
        case 25:
          this.handleUserMilestone(userId, MedalE.CountType, MedalE.CountType.UserMedalCountTwentyFive);
          break;
        case 50:
          this.handleUserMilestone(userId, MedalE.CountType, MedalE.CountType.UserMedalCountFifty);
          break;
        case 100:
          this.handleUserMilestone(userId, MedalE.CountType, MedalE.CountType.UserMedalCountOneHundred);
          break;
      }
    });

    // COUNT - HUBs.
    this.hubService.getHubsByUser(userId).then(hubs => {
      hubs.forEach(hub => {
        firebase.database().ref("Medals/Hubs/" + hub.key + "/total").on('value', snap => {
          switch(snap.val()) {
            case 10:
            this.handleHubMilestone(userId, hub.val().name, MedalE.CountType, MedalE.CountType.HubMedalCountTen);
              break;
            case 25:
            this.handleHubMilestone(userId, hub.val().name, MedalE.CountType, MedalE.CountType.HubMedalCountTwentyFive);
              break;
            case 50:
            this.handleHubMilestone(userId, hub.val().name, MedalE.CountType, MedalE.CountType.HubMedalCountFifty);
              break;
            case 100:
            this.handleHubMilestone(userId, hub.val().name, MedalE.CountType, MedalE.CountType.HubMedalCountOneHundred);
              break;
            case 500:
            this.handleHubMilestone(userId, hub.val().name, MedalE.CountType, MedalE.CountType.HubMedalCountFiveHundred);
              break;
            case 1000:
            this.handleHubMilestone(userId, hub.val().name, MedalE.CountType, MedalE.CountType.HubMedalCountOneThousand);
              break;
            case 2000:
            this.handleHubMilestone(userId, hub.val().name, MedalE.CountType, MedalE.CountType.HubMedalCountTwoThousand);
              break;
            case 5000:
            this.handleHubMilestone(userId, hub.val().name, MedalE.CountType, MedalE.CountType.HubMedalCountFiveThousand);
              break;
            case 10000:
            this.handleHubMilestone(userId, hub.val().name, MedalE.CountType, MedalE.CountType.HubMedalCountTenThousand);
              break;
          }
        });

        let hubStatList = [];
        this.hubService.getHubUsersOnce(hub.key).then(users => {
          users.forEach(user => {
            firebase.database().ref("Rankings/Users/" + user.key).on('value', scores => {
              let found = false;
              let hubStats: any = {user: "", upvotes: 0, downvotes: 0, score: 0, medal_count: 0, medal_score: 0};
              hubStatList.forEach(stat => {
                if (stat.user == user.key) {
                  found = true;
                  // CURRENT - PREVIOUS = DELTA
                  stat.upvotes +=  scores.val().upvotes - stat.upvotes;
                  stat.downvotes += scores.val().downvotes - stat.downvotes;
                  stat.score += (scores.val().upvotes - scores.val().downvotes + scores.val().medal_score) - stat.score;
                  stat.medal_count += scores.val().medal_count - stat.medal_count;
                  hubStats = stat;
                }
              });
              if (found == false) {
                hubStats.user = user.key;
                hubStats.upvotes += scores.val().upvotes;
                hubStats.downvotes += scores.val().downvotes;
                hubStats.score += scores.val().upvotes - scores.val().downvotes + scores.val().medal_score;
                hubStats.medal_count += scores.val().medal_count;
                hubStatList.push(hubStats);
              }

              this.handleHubVotesMedal(userId, hub.key, hubStats);
            });
          });
        });
      });
    });

    // MISC - USER - FRIEND
    firebase.database().ref("Friends/cJLlE03u8bfoWJQePFAsAjZuN9i2/").on('child_added', snap => {
      if (userId == snap.key)
        this.handleUserMilestone(userId, MedalE.MiscellaneousType, MedalE.MiscellaneousType.AdminIsFriend);
    });

    // MISC - USER - MEMBER & OWNER
    firebase.database().ref("Users/" + userId + "/hub_list").on('child_added', hub => {
      firebase.database().ref("Users/cJLlE03u8bfoWJQePFAsAjZuN9i2/hub_list").once('value', adminHubs => {
        adminHubs.forEach(adminHub => {
          if (adminHub.key == hub.key) {
            if (adminHub.creator == "cJLlE03u8bfoWJQePFAsAjZuN9i2")
              this.handleUserMilestone(userId, MedalE.MiscellaneousType, MedalE.MiscellaneousType.AdminIsOwner);
            else {
              this.handleHubMilestone(userId, hub.key, MedalE.MiscellaneousType, MedalE.MiscellaneousType.AdminIsMember);
              this.handleUserMilestone(userId, MedalE.MiscellaneousType, MedalE.MiscellaneousType.AdminIsMember);
            }
          }
        });
      });
    });
  }

  // updateHubRanks(userId, hubArr) {
  //   hubArr.hubStatList.sort((a, b) => {
  //     if (a.score < b.score) return 1;
  //     else if (a.score > b.score) return -1;
  //     else return 0;
  //   });
  //
  //   this.hubService.getHubsByUser(userId).then(hubs => {
  //     let myHubs = [];
  //     hubs.forEach(hub => {
  //       myHubs.push(hub.key);
  //     });
  //     let i = 0;
  //     let max = hubArr.length > 100 ? 100 : hubArr.length;
  //     hubArr = hubArr.slice(0, max);
  //     for (; i < max; i++) {
  //       console.log("i: ");
  //       console.log(i);
  //       if (myHubs.some(hub => {
  //         return hub == hubArr[i].name;
  //       }))  {
  //         this.handleHubRankMedal(userId, hubArr[i].name, i+1);
  //       }
  //     }
  //   });
  // }
  //
  // handleHubRankMedal(userId, hubId, rank) {
  //   console.log(userId);
  //   console.log(hubId);
  //   console.log(rank);
  //   if (rank <= 100) {
  //     this.handleHubMilestone(userId, hubId, MedalE.RankType, MedalE.RankType.UserOneHundred);
  //   }
  //   if (rank <= 50) {
  //     this.handleHubMilestone(userId, hubId, MedalE.RankType, MedalE.RankType.UserFifty);
  //   }
  //   if (rank <= 25) {
  //     this.handleHubMilestone(userId, hubId, MedalE.RankType, MedalE.RankType.UserTwentyFive);
  //   }
  //   if (rank <= 10) {
  //     this.handleHubMilestone(userId, hubId, MedalE.RankType, MedalE.RankType.UserTen);
  //   }
  //   if (rank <= 3) {
  //     this.handleHubMilestone(userId, hubId, MedalE.RankType, MedalE.RankType.UserThree);
  //   }
  //   if (rank == 1) {
  //     this.handleHubMilestone(userId, hubId, MedalE.RankType, MedalE.RankType.UserOne);
  //   }
  // }

  handleUserRankMedal(userId, rank) {
    if (rank <= 100)
      this.handleUserMilestone(userId, MedalE.RankType, MedalE.RankType.UserOneHundred);
    if (rank <= 50)
      this.handleUserMilestone(userId, MedalE.RankType, MedalE.RankType.UserFifty);
    if (rank <= 25)
      this.handleUserMilestone(userId, MedalE.RankType, MedalE.RankType.UserTwentyFive);
    if (rank <= 10)
      this.handleUserMilestone(userId, MedalE.RankType, MedalE.RankType.UserTen);
    if (rank <= 3)
      this.handleUserMilestone(userId, MedalE.RankType, MedalE.RankType.UserThree);
    if (rank == 1)
      this.handleUserMilestone(userId, MedalE.RankType, MedalE.RankType.UserOne);
  }

  handleHubVotesMedal(userId, hubId, hubStats) {
    switch(hubStats.upvotes) {
      case 10:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteTen);
        break;
      case 50:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteFifty);
        break;
      case 200:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteTwoHundred);
        break;
      case 500:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteFiveHundred);
        break;
      case 1000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteOneThousand);
        break;
      case 2000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteTwoThousand);
        break;
      case 5000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteFiveThousand);
        break;
      case 10000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteTenThousand);
        break;
      case 25000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteTwentyFiveThousand);
        break;
      case 50000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteFiftyThousand);
        break;
      case 100000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubUpVoteOneHundredThousand);
        break;
    }

    switch(hubStats.downvotes) {
      case 10:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteTen);
        break;
      case 50:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteFifty);
        break;
      case 200:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteTwoHundred);
        break;
      case 500:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteFiveHundred);
        break;
      case 1000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteOneThousand);
        break;
      case 2000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteTwoThousand);
        break;
      case 5000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteFiveThousand);
        break;
      case 10000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteTenThousand);
        break;
      case 25000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteTwentyFiveThousand);
        break;
      case 50000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteFiftyThousand);
        break;
      case 100000:
        this.handleHubMilestone(userId, hubId, MedalE.VoteType, MedalE.VoteType.HubDownVoteOneHundredThousand);
        break;
    }
  }

  handleHubTypes(ownCt, joinCt, userId) {
    if (ownCt >= 1)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.OwnedOne);
    if (ownCt >= 5)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.OwnedFive);
    if (ownCt >= 10)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.OwnedTen);
    if (ownCt >= 25)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.OwnedTwentyFive);
    if (ownCt >= 50)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.OwnedFifty);
    if (ownCt >= 100)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.OwnedOneHundred);

    if (joinCt >= 1)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.JoinedOne);
    if (joinCt >= 5)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.JoinedFive);
    if (joinCt >= 10)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.JoinedTen);
    if (joinCt >= 25)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.JoinedTwentyFive);
    if (joinCt >= 50)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.JoinedFifty);
    if (joinCt >= 100)
      this.handleUserMilestone(userId, MedalE.HubType, MedalE.HubType.JoinedOneHundred);

  }

  handleUserMilestone(userId, genType, type) {
    firebase.database().ref("Medals/Users/" + userId + "/" + type).once('value', snap => {
      if (snap.val() != MedalE.Dismissed) {
        this.notifService.medalNotifUser(userId, type);
        firebase.database().ref("Medals/Users/" + userId + "/" + type).set(0);
        if (snap == null || snap.val() == null) {
          firebase.database().ref("Medals/Users/" + userId + "/total").transaction(function(total) {
            return total + 1;
          });
        }
      }
    });
  }

  handleHubMilestone(userId, hubId, genType, type) {
    firebase.database().ref("Medals/Hubs/" + hubId + "/"+ type).once('value', snap => {
      if (snap.val() != MedalE.Dismissed) {
        this.notifService.medalNotifHub(userId, hubId, type);
        firebase.database().ref("Medals/Hubs/" + hubId + "/" + type).set(hubId);
        if (snap == null || snap.val() == null) {
          firebase.database().ref("Medals/Hubs/" + hubId + "/total").transaction(function(total) {
            return total + 1;
          });
        }
      }
    });
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

  getOwnedMedalArr(userId) {
    return firebase.database().ref("Medals/Users/" + userId).once('value');
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
