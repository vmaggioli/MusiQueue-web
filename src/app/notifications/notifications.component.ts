import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { NotifService } from '../shared/notif.service';
import { User } from '../objects/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lsl-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  friendNotifs: User[];
  pics: string[];

  constructor(
    public usersService: UsersService,
    public notifService: NotifService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.notifService.getUserNotifs(this.usersService.currentUser.uid).subscribe(notifs => {
      this.friendNotifs = [];
      this.pics = [];
      notifs.forEach(notif => {
        this.usersService.getUserByIdOnce(notif.$key).then(user => {
          this.friendNotifs.push(user.val());
          this.usersService.getPic(user.val().uid).then(pic => {
            console.log(pic);
            this.pics.push(pic);
          });
        });
      });
    });
  }

  onAccept(friend) {
    this.notifService.acceptFriend(this.usersService.currentUser.uid, friend.uid);
    this.snackBar.open("You are now friends with " + friend.username + "!", "Dismiss", {
      duration: 2000
    });
  }

  onDecline(friend) {
    this.notifService.declineFriend(this.UsersService.currentUser.uid, friend.uid);
  }

}
