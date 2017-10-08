import { Component, OnInit } from '@angular/core';
import { Hub } from '../objects/hub';
import { HubService } from '../shared/hub.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'lsl-hub-login',
  templateUrl: './hub-login.component.html',
  styleUrls: ['./hub-login.component.css']
})
export class HubLoginComponent {
  name: string = "";
  creator: string = "";
  pin: number = 0;
  hub: Hub;
  constructor(public hubService: HubService, public route: ActivatedRoute, public router: Router) { }

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
      this.router.navigate(['user-hub-view', {name: this.name}])
    }
    console.log("input: " + input);
  }
}
