import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Hub } from '../objects/hub';
import { HubService } from '../shared/hub.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UsersService } from '../shared/users.service';


@Component({
  selector: 'lsl-hub-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hub-login.component.html',
  styleUrls: ['./hub-login.component.css']
})
export class HubLoginComponent {
  name: string = "";
  creator: string = "";
  pin: number = 0;
  hub: Hub;
  constructor(public hubService: HubService,
    public usersService: UsersService,
    private auth: AuthService,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.hubService.getHubByName(this.name).subscribe(hub => {
        this.creator = hub.creator;
        this.pin = hub.pin;
        this.hub = hub;
        console.log(hub);
        console.log("creator: " +hub.creator);
        console.log("pin: " + hub.pin);
      });
    });
  }

  checkPin(input) {
    if (input != this.pin) {
      // wrong pin
    }
    else {
      this.hubService.currentHub = this.hub;
      this.usersService.addHubUnderUser(this.usersService.currentUser.uid, this.name);
      this.usersService.addUserToHub(this.usersService.currentUser.uid, this.name);
      if (this.auth.getCurrentUser().displayName == this.creator) {
        this.router.navigate(['hub-main', {name: this.name}]);
      } else {
        this.router.navigate(['user-hub-view', {name: this.name}]);
      }
    }
    console.log("input: " + input);
  }
}
