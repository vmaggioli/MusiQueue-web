import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UsersService } from '../shared/users.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from '../objects/user';

@Component({
  selector: 'lsl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topics: FirebaseListObservable<any[]>;
  user = null;
  loggedIn: boolean = false;
  usname: string = "";

  constructor(private auth: AuthService,
              private router: Router,
              public db: AngularFireDatabase,
              public usersService: UsersService) { }

  ngOnInit() {
    // need to force initial user data for compilation
    this.usersService.currentUser = new User("", "", true, false, "", Date.now(), []);
    this.usname = "";
    this.auth.getAuthState().subscribe((user) => {
      if (user != null) {
        this.user = user
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
    if (this.user)
      this.usersService.currentUser = new User(this.usname, this.user.uid, true, false, this.user.email, Date.now(), []);
    else
      this.usersService.currentUser.username = this.usname;
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
