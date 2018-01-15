import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { HubService } from '../shared/hub.service';
import { RankingService } from '../shared/ranking.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'lsl-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css'],
  providers: [RankingService],
  encapsulation: ViewEncapsulation.None,
})
export class LeaderboardsComponent implements OnInit {
  pUser: number = 1;
  pHub: number = 1;
  tabIdx: number;
  userTableList: any;
  hubTableList: any;

  constructor(
    public usersService: UsersService,
    public hubService: HubService,
    public rankingService: RankingService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userTableList = [];
    this.hubTableList = [];

    this.rankingService.getUserRanksOnce().then(userRanks => {
      this.getUsers(userRanks);

      let ct = 0;
      userRanks.forEach(() => {
          ct++;
      });

      let userTimeout = setInterval(() => {
        if (this.userTableList.length == ct) {
          clearInterval(userTimeout)
          this.userTableList.sort((a, b) => {
            if (a.score < b.score) return 1;
            else if (a.score > b.score) return -1;
            else return 0;
          });
        }
      }, 100);
    });

    this.rankingService.getHubRanksOnce().then(hubRanks => {
      this.getHubs(hubRanks);

      let ct = 0;
      hubRanks.forEach(() => {
        ct++;
      });

      let hubTimeout = setInterval(() => {
        if (this.hubTableList.length == ct) {
          clearInterval(hubTimeout);
          this.hubTableList.sort((a, b) => {
            if (a.score < b.score) return 1;
            else if (a.score > b.score) return -1;
            else return 0;
          });
        }
      }, 100);
    });
  }

  getUsers(userRanks) {
    userRanks.forEach(userRank => {
        this.usersService.getUserByIdOnce(userRank.key).then(user => {
          this.usersService.getPic(userRank.key).then(pic => {
            this.userTableList.push({
              id: userRank.key,
              pic: pic,
              name: user.val().username,
              score: userRank.val().upvotes - userRank.val().downvotes + userRank.val().medal_score,
              medal_count: userRank.val().medal_count,
            });
          }, notFound => {
            this.usersService.getPic("__stock__").then(p => {
              this.userTableList.push({
                id: userRank.key,
                pic: p,
                name: user.val().username,
                score: userRank.val().upvotes - userRank.val().downvotes + userRank.val().medal_score,
                medal_count: userRank.val().medal_count,
              });
            });
          });
        });
      });
  }

  getHubs(hubRanks) {
    hubRanks.forEach(hubRank => {
      this.hubService.getHubByNameOnce(hubRank.key).then(hub => {
        let score = 0;
        this.hubService.getHubUsersOnce(hubRank.key).then(users => {
          users.forEach(user => {
            this.rankingService.getUserScores(user.key).then(u => {
              score += (u.val().upvotes - u.val().downvotes + hubRank.val().medal_score);
            });
          });
          this.hubService.getPic(hubRank.key).then(pic => {
            this.hubTableList.push({
              pic: pic,
              name: hub.val().name,
              score: score,
              medal_count: hubRank.val().medal_count,
            });
          }, notFound => {
            this.usersService.getPic("__stock__").then(p => {
              this.hubTableList.push({
                pic: p,
                name: hub.val().name,
                score: score,
                medal_count: hubRank.val().medal_count,
              });
            });
          });
        });
      });
    });
  }

  onSelected(event) {

  }

  onUserClick(user) {
    this.router.navigate(['user-profile', user]);
  }

  onHubClick(hub) {
    this.router.navigate(['hub-profile', hub]);
  }

  pageChanged(event) {
  }
}
