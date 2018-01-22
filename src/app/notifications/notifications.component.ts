import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { NotifService } from '../shared/notif.service';
import { MedalService } from '../shared/medal.service';
import { User } from '../objects/user';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MedalE } from '../enums/medalE';

@Component({
  selector: 'lsl-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NotifService, MatDialog],
})
export class NotificationsComponent implements OnInit {
  friendNotifs: User[] = [];
  medalNotifs: any = [];
  kickedNotifs: any = [];
  pics: string[];
  url: string;
  constructor(
    public usersService: UsersService,
    public notifService: NotifService,
    public medalService: MedalService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

    ngOnInit() {
    this.notifService.getFriendNotifs(this.usersService.currentUser.uid).subscribe(notifs => {
      this.friendNotifs = [];
      this.pics = [];
      notifs.forEach(notif => {
        this.usersService.getUserByIdOnce(notif.$key).then(user => {
          this.friendNotifs.push(user.val());
          this.usersService.getPic(user.val().uid).then(pic => {
            this.pics.push(pic);
          });
        });
      });
    });

    this.notifService.getMedalNotifs(this.usersService.currentUser.uid).subscribe(notifs => {
      this.medalNotifs = [];
      notifs.forEach(notif => {
        let medalObj = this.medalService.getMedal(notif.$key);
        this.medalService.getMedalPic("default").then(p => {
          medalObj.pic = p;
          medalObj.hub = notif.$value;
          this.medalNotifs.push(medalObj);
        });
      });
    });

    this.notifService.getKickedNotifs(this.usersService.currentUser.uid).subscribe(notifs => {
      this.kickedNotifs = [];
      notifs.forEach(notif => {
        kickedNotifs.push(notif.$key);
      });
    });
  }

  onAccept(friend) {
    this.notifService.acceptFriend(this.usersService.currentUser.uid, friend.uid);
    this.snackBar.open("You are now friends with " + friend.username + "!", "Dismiss", {
      duration: 3000
    });
  }

  onDecline(friend) {
    this.notifService.declineFriend(this.usersService.currentUser.uid, friend.uid);
  }

  dismissMedal(medal) {
    switch(medal.constructor.name) {
      case "FriendMedal":
        this.notifService.dismissMedal(this.usersService.currentUser.uid, MedalE.FriendType, medal.id);
        break;
      case "HubMedal":
        if (medal.hub == 0)
          this.notifService.dismissMedal(this.usersService.currentUser.uid, MedalE.HubType, medal.id);
        else
          this.notifService.dismissMedalHub(this.usersService.currentUser.uid, medal.hub, MedalE.HubType, medal.id);
        break;
      case "VoteMedal":
        if (medal.hub == 0)
          this.notifService.dismissMedal(this.usersService.currentUser.uid, MedalE.VoteType, medal.id);
        else
          this.notifService.dismissMedalHub(this.usersService.currentUser.uid, medal.hub, MedalE.VoteType, medal.id);
        break;
      case "RankMedal":
        if (medal.hub == 0)
          this.notifService.dismissMedal(this.usersService.currentUser.uid, MedalE.RankType, medal.id);
        else
          this.notifService.dismissMedalHub(this.usersService.currentUser.uid, medal.hub, MedalE.RankType, medal.id);
        break;
      case "CountMedal":
        this.notifService.dismissMedal(this.usersService.currentUser.uid, MedalE.CountType, medal.id);
        break;
      case "MiscMedal":
        this.notifService.dismissMedal(this.usersService.currentUser.uid, MedalE.MiscellaneousType, medal.id);
        if (medal.id == MedalE.MiscellaneousType.AdminIsMember)
          this.notifService.dismissMedalHub(this.usersService.currentUser.uid, medal.hub, MedalE.MiscellaneousType, medal.id);
        break;
    }
  }

  viewMedal(medal) {
    let dialogRef = this.dialog.open(NotifPopup, {
      width: "300px",
      data: medal
    });
  }

  dismissKicked(hubId) {
    this.notifService.dismissKicked(this.usersService.currentUser.uid, hubId);
  }
}



@Component({
  selector: 'lsl-medal-popup',
  templateUrl: 'medal-popup.html',
  styleUrls: ['medal-popup.css'],

})
export class NotifPopup implements OnInit {
  defaultPic: string = "";
  constructor(
    public dialogRef: MatDialogRef<NotifPopup>,
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
