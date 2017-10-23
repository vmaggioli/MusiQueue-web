import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Hub } from '../objects/Hub';
import { HubService } from '../shared/hub.service';
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
  recentHubsOfUser: Hub[];
  hubsFromSearch: Hub[];
  lats: FirebaseListObservable<Hub[]>;
  longs: FirebaseListObservable<Hub[]>;
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
    console.log("button click is working");
    this.locHubs = [];
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
    this.displayingLocalHubs = true;
    this.displayingRecentHubs = false;
    this.displayingSearchHubs = false;
  }

  recentHubs() {
    console.log("made it");
    this.recentHubsOfUser = [];
    this.usersService.getRecentHubs().subscribe(hubs => {
      hubs.forEach(hub => {
        this.recentHubsOfUser.push(hub);
      });
    });
    this.displayingRecentHubs = true;
    this.displayingLocalHubs = false;
    this.displayingSearchHubs = false;
  }

  searchHubs(hubName: string) {
    this.hubsFromSearch = this.hubService.getHubsBySearch(hubName);
    this.displayingSearchHubs = true;
    this.displayingLocalHubs = false;
    this.displayingRecentHubs = false;
  }

  onHubSelected(hub) {

  }
}
