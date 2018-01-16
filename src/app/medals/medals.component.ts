import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { HubService } from '../shared/hub.service';
import { RankingService } from '../shared/ranking.service';
import { MedalService } from '../shared/medal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lsl-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.css'],
  providers: [RankingService],
})
export class MedalsComponent implements OnInit {
  allMedals: any;
  ownedMedals: any;
  friendMedals: any;
  hubMedals: any;
  voteMedals: any;
  rankMedals: any;
  countMedals: any;
  miscMedals: any;

  defaultPic: string;

  constructor(
    public usersService: UsersService,
    public hubService: HubService,
    public rankingService: RankingService,
    public medalService: MedalService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.medalService.getMedalPic("default").then(pic => {
      this.defaultPic = pic;
    });

    this.allMedals = this.medalService.getAllMedals();
    this.friendMedals = this.medalService.getFriendMedals();
    this.hubMedals = this.medalService.getHubMedals();
    this.voteMedals = this.medalService.getVoteMedals();
    this.rankMedals = this.medalService.getRankMedals();
    this.countMedals = this.medalService.getCountMedals();
    this.miscMedals = this.medalService.getMiscMedals();
  }

  onSelected(doesntmatter)
  {

  }

}
