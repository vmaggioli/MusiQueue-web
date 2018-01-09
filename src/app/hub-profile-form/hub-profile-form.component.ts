import { Component, OnInit } from '@angular/core';
import { HubService } from '../shared/hub.service';
import { UsersService } from '../shared/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lsl-hub-profile-form',
  templateUrl: './hub-profile-form.component.html',
  styleUrls: ['./hub-profile-form.component.css']
})
export class HubProfileFormComponent implements OnInit {

  public url: string;
  public hubName: string;
  public location: string;

  constructor(
    public hubService: HubService,
    public usersService: UsersService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var hubId = params['name'];
      this.hubService.getPic(hubId).then(found => {
        this.url = found;
      }, notFound => {
        this.usersService.getPic("__stock__").then(p => {
          this.url = p;
        });
      });

      this.hubService.getHubByNameOnce(hubId).then(hub => {
        console.log(hub.val());
        console.log(hub.val().location);
        this.location = hub.val().location;
        this.hubName = hub.val().name;
      });
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
        var imgMessage = event.target.result.split(",", 2)[1];
        this.hubService.updatePic(this.hubName, imgMessage);
      }
    }
  }

  onSubmit() {
    this.hubService.updateProfile(this.hubName, this.location);
    this.router.navigate(['hub-profile', this.hubName]);
  }
}
