import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UsersService } from '../shared/users.service';
import { RankingService } from '../shared/ranking.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from '../objects/user';

import { Medal } from '../enums/medal';

@Component({
  selector: 'lsl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RankingService],
})
export class HomeComponent implements OnInit {
  topics: FirebaseListObservable<any[]>;
  //user = null;
  loggedIn: boolean = false;
  usname: string = "";

  constructor(private auth: AuthService,
              private router: Router,
              public db: AngularFireDatabase,
              public usersService: UsersService,
              public rankingService: RankingService,
            ) { }

  ngOnInit() {
    // need to force initial user data for compilation
    this.usersService.currentUser = new User("", "", true, false, "", Date.now(), "none", []);
    this.usname = "";
    this.auth.getAuthState().subscribe((user) => {
      if (user != null) {
        this.usersService.getUserById(user.uid).subscribe(u => {
          if (u) {
            this.usersService.currentUser = new User(u.username, u.uid, u.active, u.kicked, u.email, u.last_active, u.location, u.hub_list);
          }
        });
        //this.user = user
        this.loggedIn = true;
        var ref = firebase.database().ref("Users/" + user.uid);
        if (this.usname == null || this.usname == "") {
          ref.once("value", u => {
            this.usname = u.val().username;
            this.setAndGo();
          });
        } else {
          ref.update({username: this.usname});
        }
      }
    });
  }

  setAndGo() {
    if (this.usname == null || this.usname == "") {
      if (confirm("You did not enter a name for yourself. Press 'OK' if you want us to try to find a past username or 'Cancel' for a default name")) {
        return;
      }
      else {
        this.usname = "guest";
      }
    }
    if(this.usname.indexOf(' ') != -1) {
      confirm("No whitespace is allowed in usernames");
      return;
    }
    if (this.user)
      this.usersService.currentUser = new User(this.usname,
        this.usersService.currentUser.uid, true, false, this.usersService.currentUser.email,
        Date.now(), this.usersService.currentUser.location, []);
    else
      this.usersService.currentUser.username = this.usname;
    this.rankingService.initUserScores(this.usersService.currentUser.uid);
    this.router.navigate(['create-join']);
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then((result) => {
      if (this.auth.getCurrentUser() != null) {
        this.loggedIn = true;
      }
      this.setAndGo();
    });
  }
}
