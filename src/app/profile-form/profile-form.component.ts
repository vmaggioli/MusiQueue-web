import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lsl-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  public url: string;
  public username: string;
  public location: string;

  constructor(
    public usersService: UsersService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var uid = params['name'];
      this.usersService.getPic(uid).then(found => {
        this.url = found;
      }, notFound => {
        this.usersService.getPic("__stock__").then(p => {
          this.url= p;
        });
      });
      this.location = this.usersService.currentUser.location;
      this.username = this.usersService.currentUser.username;
    });
  }

  onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          this.url = event.target.result;
          var imgMessage = event.target.result.split(",", 2)[1];
          this.usersService.updatePic(this.usersService.currentUser.uid, imgMessage);
        }
      }
  }

  onSubmit() {
    this.usersService.updateProfile(this.usersService.currentUser.uid, this.username, this.location);
    this.router.navigate(['user-profile', this.usersService.currentUser.uid]);
  }
}
