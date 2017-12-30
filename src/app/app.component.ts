import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { UsersService } from "./shared/users.service";
import * as firebase from 'firebase/app';
import { HubService } from './shared/hub.service';
import { Router, ActivatedRoute } from '@angular/router';


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
              public route: ActivatedRoute,
              public router: Router) {
                this.route.params.subscribe(params => console.log(""));
              }

  ngOnInit() { }

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
    this.router.navigate(['user-profile', this.usersService.currentUser.uid])
  }

  onUserHubsSelected() {
    this.router.navigate(['owned-hubs', this.usersService.currentUser.uid])
  }

  onLeaderboardSelected() {
    this.router.navigate(['leaderboards'])

  }
}
