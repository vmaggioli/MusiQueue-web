import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { HubService } from '../shared/hub.service';
import { RankingService } from '../shared/ranking.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'lsl-owned-hubs',
  templateUrl: './owned-hubs.component.html',
  styleUrls: ['./owned-hubs.component.css'],
  providers: [RankingService],
})

export class OwnedHubsComponent implements OnInit {
  dataArray: [];
  rank: number;

  constructor(
    public usersService: UsersService,
    public hubService: HubService,
    public route: ActivatedRoute,
    public router: Router,
    public rankingService: RankingService,
  ) { }

  ngOnInit() {
    this.dataArray = [];
    this.hubService.getHubsByUser(this.usersService.currentUser.uid).then(snap => {
      this.dataArray = [];
      let i = 0;
      snap.forEach(s => {
        this.hubService.getHubByNameOnce(s.key).then(hub => {
          let ct: number = 0;
          let users: Any[] = hub.val().users;
          var u;
          for (u in users)
            ct = ct + 1;

          this.usersService.getUserByIdOnce(hub.val().creator).then(user => {
            this.dataArray.push({Name: hub.val().name, Creator: user.val().username, Members: ct, Rank: this.rank});
            this.getHubRank(hub.val().name, i);
            i++;
          });
        });
      });
    });
  }

  goToHub(hub) {
    this.router.navigate(['hub-profile', hub]);
  }

  getHubRank(hubId, idx) {
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
      this.rank = 0;
      while (i < ranksArray.length) {
        if (ranksArray[i].hub == hubId) {
          this.dataArray[idx].Rank = i + 1;
          break;
        }
        i++;
      }
    });
  }
}
