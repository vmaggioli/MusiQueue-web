import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { HubService } from '../shared/hub.service';
import { RankingService } from '../shared/ranking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../objects/user';

@Component({
  selector: 'lsl-hub-profile',
  templateUrl: './hub-profile.component.html',
  styleUrls: ['./hub-profile.component.css'],
  providers: [RankingService],
})

export class HubProfileComponent implements OnInit {
  url: string;
  isCreator: any = null;
  hubId: string;
  curHub: any;
  members: any;
  tabIdx: number = 0;

  constructor(
    public usersService: UsersService,
    public hubService: HubService,
    public rankingService: RankingService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hubId = params['name'];

      this.hubService.getHubByNameOnce(this.hubId).then(hub => {
        this.curHub = hub.val();
        this.curHub.total_upvotes = 0;
        this.curHub.total_downvotes = 0;
        this.curHub.score = 0;

        this.rankingService.getHubScores(this.hubId).then(scores => {
          // TODO: IMPLEMENT MEDALS AND REMOVE HARD-CODED VALUES
          this.curHub.medal_count = scores.val().medal_count;
          this.curHub.medal_score = scores.val().medal_score;
        });

        if (this.usersService.currentUser.uid == this.curHub.creator)
          this.isCreator = true;
        else
          this.isCreator = false;

        this.hubService.getPic(this.hubId).then(found => {
          this.url = found;
        }, notFound => {
          this.usersService.getPic("__stock__").then(p => {
            this.url = p;
          });
        });
      });
      this.handleMembers();
      this.tabIdx = 0;
    });
  }

  getHubRank() {
    this.rankingService.getHubRanksOnce().then(ranks => {
      let ranksArray = [];
      let i = 0;

      ranks.forEach(rankItem => {
        ranksArray.push(rankItem.val());
        ranksArray[i].hub = rankItem.key;
        i++;
      });

      ranksArray.sort((a, b) => {
        if (a.score < b.score) return 1;
        else if (a.score > b.score) return -1;
        else return 0;
      });

      i = 0;
      while (i < ranksArray.length) {
        if (ranksArray[i].hub == this.hubId) {
          this.curHub.rank = i + 1;
          break;
        }
        i++;
      }
    });

  }

  editProfile() {
    this.router.navigate(['hub-profile-form', this.hubId]);
  }

  joinHub() {
    this.hubService.getHubUsersOnce(this.hubId).then(users => {
      let hasUser = false;
      users.forEach(user => {
        if (user.key == this.usersService.currentUser.uid)
          hasUser = true;
      });
      if (hasUser)
        confirm("You are already a member of this hub.");
      else {
        this.router.navigate(["hub-login", this.hubId]);
      }
    });
  }

  handleMembers() {
    this.members = [];
    this.hubService.getHubUsersOnce(this.hubId).then(snap => {
      snap.forEach(s => {
        let member = {upvotes: 0, downvotes: 0, medal_count: 0, medal_score: 0, user: 0, pic: 0};
        this.usersService.getUserByIdOnce(s.key).then(user => {
          this.rankingService.getUserScores(user.val().uid).then(scores => {

            member.upvotes = scores.val().upvotes;
            member.downvotes = scores.val().downvotes;
            member.medal_count = scores.val().medal_count;
            member.medal_score = scores.val().medal_score;

            this.curHub.total_upvotes += scores.val().upvotes;
            this.curHub.total_downvotes += scores.val().downvotes;
            this.curHub.score += this.curHub.total_upvotes - this.curHub.total_downvotes;
            // TODO: IMPLEMENT MEDALS INTO SCORE VALUES
          });

          this.rankingService.setHubScore(this.hubId, this.curHub.score);

          var userUrl: string;
          this.usersService.getPic(user.val().uid).then(pic => {
            member.user = user.val();
            member.pic = pic;
            this.members.push(member);
          }, notFound => {
            this.usersService.getPic("__stock__").then(p => {
              member.user = user.val();
              member.pic = p;
              this.members.push(member);
            });
          });
        });
      });
      this.getHubRank();
    });
  }

  onSelected(event) {
    if (this.tabIdx == 0) {
      this.handleMembers();
    }
  }

  onMemberSelected(member) {
    this.router.navigate(['user-profile', member.user.uid]);
  }








}
