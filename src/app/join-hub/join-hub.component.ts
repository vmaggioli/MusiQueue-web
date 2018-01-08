import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Hub } from '../objects/hub';
import { HubService } from '../shared/hub.service';
import { UsersService } from '../shared/users.service';


@Component({
  selector: 'join-hub',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './join-hub.component.html',
  styleUrls: ['./join-hub.component.css']
})

export class JoinHubComponent {
  location = undefined;
  locHubs: Hub[] = [];
  recentHubsOfUser: Hub[];
  hubsFromSearch: Hub[];
  displayingLocalHubs: boolean = false;
  displayingRecentHubs: boolean = false;
  displayingSearchHubs: boolean = false;

  constructor(public router: Router,
    public hubService: HubService,
    public usersService: UsersService) {

  }

  ngOnInit() {

  }

  searchLocation() {
    this.locHubs = [];
    navigator.geolocation.getCurrentPosition(pos => {
      this.location = pos.coords;
      this.hubService.getHubsByLat(this.location.latitude).subscribe(h => {
        this.hubService.getHubsByLong(this.location.longitude).subscribe(h => {
          h.forEach(hu => {
            if (this.locHubs.indexOf(hu) < 0)
              this.locHubs.push(hu);
          });
        });
      });
    });
    this.displayingLocalHubs = true;
    this.displayingRecentHubs = false;
    this.displayingSearchHubs = false;
  }

  recentHubs() {
    this.recentHubsOfUser = [];
    this.usersService.getRecentHubs().subscribe(hubs => {
      hubs.forEach(hub => {
        this.hubService.getHubByName(hub.$key).subscribe(Hub => {
          this.recentHubsOfUser.unshift(Hub);
        });
      });
    });
    this.displayingRecentHubs = true;
    this.displayingLocalHubs = false;
    this.displayingSearchHubs = false;
  }

  searchHubs(hubName: string) {
      if(!hubName||0==hubName.length)
      {
        confirm("Please enter a value");
        return;
      }
    this.hubsFromSearch = this.hubService.getHubsBySearch(hubName);
    this.displayingSearchHubs = true;
    this.displayingLocalHubs = false;
    this.displayingRecentHubs = false;
  }


  onHubSelected(hub) {

  }
}
