import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { HubService } from '../shared/hub.service';
import { RankingService } from '../shared/ranking.service';
import { MedalService } from '../shared/medal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'lsl-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.css'],
  providers: [RankingService, MatDialog,],
})
export class MedalsComponent implements OnInit {
  allMedals: any;
  ownedMedals = [];
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
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.medalService.getMedalPic("default").then(pic => {
      this.defaultPic = pic;
    });

    this.ownedMedals = [];

    //this.allMedals = this.medalService.getAllMedals();
    this.medalService.getOwnedMedalArr(this.usersService.currentUser.uid).then(medals => {
      medals.forEach(medal => {
        if (medal.key != "total")
          this.ownedMedals.push(this.medalService.getMedal(medal.key));
      });
    });
    this.friendMedals = this.medalService.getFriendMedalArr();
    this.hubMedals = this.medalService.getHubMedalArr();
    this.voteMedals = this.medalService.getVoteMedalArr();
    this.rankMedals = this.medalService.getRankMedalArr();
    this.countMedals = this.medalService.getCountMedalArr();
    this.miscMedals = this.medalService.getMiscMedalArr();

  }

  onMedalClick(medal) {
    let dialogRef = this.dialog.open(MedalPopup, {
      width: "300px",
      data: medal
    });
  }

  onSelected(doesntmatter)
  {

  }

}


@Component({
  selector: 'lsl-medal-popup',
  templateUrl: 'medal-popup.html',
  styleUrls: ['medal-popup.css'],

})
export class MedalPopup implements OnInit {
  defaultPic: string = "";
  constructor(
    public dialogRef: MatDialogRef<MedalPopup>,
    public medalService: MedalService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.medalService.getMedalPic("default").then(pic => {
        this.defaultPic = pic;
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
