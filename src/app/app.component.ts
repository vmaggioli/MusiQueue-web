import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';



@Component({
  selector: 'lsl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'MusiQueue-web';

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit() { }

  logoutWithGoogle() {
    this.auth.logoutWithGoogle().then((result) => {
      if (this.auth.getCurrentUser() == null) {
        this.router.navigateByUrl('');
      }
    });
  }
}
