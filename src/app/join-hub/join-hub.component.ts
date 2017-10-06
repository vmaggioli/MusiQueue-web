import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Hub } from '../objects/Hub';
import { HubService } from '../shared/hub.service';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';


@Component({
  selector: 'join-hub',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './join-hub.component.html',
  styleUrls: ['./join-hub.component.css']
})

export class JoinHubComponent {
  location = {};
  locHubs: Hub[] = [];
  recentHubs: Hub[];
  lats: FirebaseListObservable<Hub[]>;
  longs: FirebaseListObservable<Hub[]>;

  constructor(public router: Router, public hubService: HubService, public usersService: UsersService) {

  }

  ngOnInit() {

  }

  searchLocation() {
    console.log("button click is working");
    navigator.geolocation.getCurrentPosition(pos => {
      this.location = pos.coords;
      this.lats = this.hubService.getHubsByLat(this.location.latitude).subscribe(h => {
        this.longs = this.hubService.getHubsByLong(this.location.longitude).subscribe(h => {
          h.forEach(hu => {
            if (this.locHubs.indexOf(hu) < 0)
              this.locHubs.push(hu);
          });
        });
      });

    });
  }
  
  recentHubs() {
    this.recentHubs = [];
    this.usersService.getRecentHubs().subscribe(hubs => {
      hubs.forEach(hub => {
        this.recentHubs.push(hub);
      });
    });
  }

  onHubSelected(hub) {
    
  }
}
