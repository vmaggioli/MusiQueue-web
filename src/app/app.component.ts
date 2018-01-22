import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { UsersService } from "./shared/users.service";
import { MedalService } from './shared/medal.service';
import * as firebase from 'firebase/app';
import { HubService } from './shared/hub.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Medal } from './objects/medal';
import { NotifService } from './shared/notif.service';


@Component({
  selector: 'lsl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'MusiQueue-web';
  drawer: any;

  constructor(
              private auth: AuthService,
              public usersService: UsersService,
              public hubService: HubService,
              public medalService: MedalService,
              public route: ActivatedRoute,
              public router: Router,
              public notifService: NotifService,
            ) {
                this.route.params.subscribe(params => {});
              }

  ngOnInit() {
    this.medalService.allMedals = new Medal();
  }

  clearListeners() {
    firebase.database().ref("Hubs/" + this.hubService.currentHub.name).off();
  }

  logoutWithGoogle() {
    this.usersService.currentUser = null;
    this.auth.logoutWithGoogle().then((result) => {
      if (this.auth.getCurrentUser() == null) {
        this.router.navigateByUrl('');
      }
    });
    location.reload();
  }

  onProfileSelected() {
    this.router.navigate(['user-profile', this.usersService.currentUser.uid]);
  }

  onUserHubsSelected() {
    this.router.navigate(['owned-hubs', this.usersService.currentUser.uid]);
  }

  onNotificationsSelected() {
    this.router.navigate(['notifications', this.usersService.currentUser.uid]);
  }

  onMedalsSelected() {
    this.router.navigate(['medals', this.usersService.currentUser.uid]);
  }

  onHowToSelected() {
    this.router.navigate(['how-to']);
  }

  onLeaderboardSelected() {
    this.router.navigate(['leaderboards']);
  }
}
