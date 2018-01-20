import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { NotifService } from '../shared/notif.service';
import { MedalService } from '../shared/medal.service';
import { User } from '../objects/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lsl-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [NotifService, ],
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
      console.log(notifs);
      notifs.forEach(notif => {
        console.log(notif);
        let medalObj = this.medalService.getMedal(notif.$key);{
        this.medalService.getMedalPic("default").then(p => {
          medalObj.pic = p;
          this.medalNotifs.push(medalObj);
        });
        console.log(medalObj);
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

  dismissMedal(medalId) {
    this.notifService.dismissMedal(this.usersService.currentUser.uid, medalId);
  }

  viewMedal(medalId) {
    this.snackBar.open("Medal Info Pages Coming Soon!", "Dismiss", {
      duration: 3000
    });
  }

  dismissKicked(hubId) {
    this.notifService.dismissKicked(this.usersService.currentUser.uid, hubId);
  }
}
