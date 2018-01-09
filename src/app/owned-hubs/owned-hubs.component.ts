import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { HubService } from '../shared/hub.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'lsl-owned-hubs',
  templateUrl: './owned-hubs.component.html',
  styleUrls: ['./owned-hubs.component.css']
})

export class OwnedHubsComponent implements OnInit {
  cols = ['Name', 'Creator', 'Members', 'Rating'];
  dataArray: HubElement[];


  constructor(
    public usersService: UsersService,
    public hubService: HubService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.hubService.getHubsByUser(this.usersService.currentUser.uid).then(snap => {
      this.dataArray = [];
      snap.forEach(s => {
        this.hubService.getHubByNameOnce(s.key).then(hub => {
          let ct: number = 0;
          let users: Any[] = hub.val().users;
          var u;
          for (u in users)
            ct = ct + 1;
          this.usersService.getUserByIdOnce(hub.val().creator).then(user => {
            console.log(user);
            this.dataArray.push({Name: hub.val().name, Creator: user.val().username, Members: ct, Rating: 0});
          });
        });
      });
    });
  }

  goToHub(hub) {
    this.router.navigate(['hub-profile', hub]);
    // this.hubService.getCreator(hub).then(creator => {
    //   if (this.usersService.currentUser.uid == creator.val()) {
    //     this.hubService.getHubByNameOnce(hub).then(h => {
    //       this.hubService.currentHub = h.val();
    //       this.router.navigate(['hub-main', {name: hub}]);
    //     });
    //   }
    //   else
    //     this.router.navigate(['hub-login', hub]);
    // });
  }
}

export interface HubElement {
  Name: string;
  Creator: string;
  Members: number;
  Rating: number;
}
