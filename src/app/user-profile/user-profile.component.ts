import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lsl-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public url: string;
  public isOwnerProfile: boolean = false;

  constructor(
    public usersService: UsersService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    // need to extract uid from url instead
    this.route.params.subscribe(params => {
      var uid = params['name'];
      if (uid == this.usersService.currentUser.uid)
        this.isOwnerProfile = true;
      else
        this.isOwnerProfile = false;

      this.usersService.getPic(uid).then(p => {
        this.url = p;
      });
    });
  }

  editProfile() {
    this.router.navigate(['profile-form', this.usersService.currentUser.uid]);
  }

}
