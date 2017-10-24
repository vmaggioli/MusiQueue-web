import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { UsersService } from "./shared/users.service";


@Component({
  selector: 'lsl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'MusiQueue-web';

  constructor(private router: Router,
              private auth: AuthService,
              public usersService: UsersService) { }

  ngOnInit() { }

  logoutWithGoogle() {
    console.log("uname: "+ this.usersService.currentUser.username);
    this.usersService.currentUser = null;

    this.auth.logoutWithGoogle().then((result) => {
      console.log(this.auth.getCurrentUser());
      if (this.auth.getCurrentUser() == null) {
        this.router.navigateByUrl('');
      }
    });
  }
}
