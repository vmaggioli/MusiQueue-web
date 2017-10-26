import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ParamMap} from '@angular/router';
import { HubService } from '../shared/hub.service';
import { Hub } from '../objects/hub';
import { UsersService } from '../shared/users.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'create-hub',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-hub.component.html',
  styleUrls: ['./create-hub.component.css'],
  providers: [],
})

export class CreateHubComponent {

  name: string;
  passwd: string;
  location = {};
  constructor(
    private router: Router
    public hubService: HubService
    public usersService: UsersService) {

  }

  ngOnInit() {

  }

  gotoHubMain(name:string,passwd:string) {
    this.passwd = passwd;
    this.name = name;

    if(isValidPW(this.passwd) && isValidName(this.name)) {
      var hubRef = firebase.database().ref("Hubs/" + this.name);
      hubRef.once("value", hubName => {
        if (hubName.val() == null) {
          this.hubService.currentHub = new Hub(this.name, "user", "user", this.passwd, "date", [], []);
          if (this.location.longitude != undefined) {
            this.hubService.createHub("false", "user", "date", this.location.latitude, this.location.longitude, this.name, this.passwd, "users", "wifi");
          } else {
            this.hubService.createHub("false", "user", "date", 0, 0, this.name, this.passwd, "users", "wifi");
          }
          this.usersService.addHubUnderUser(this.usersService.currentUser.uid, this.name);
          this.usersService.addUserToHub(this.usersService.currentUser.uid, this.name);
          this.router.navigate(['hub-main',{name: this.name}]);
        } else {
          confirm("A hub with that name already exists!");
        }
      });
    }
    else(console.log("invalid name or passwd"))
  }

  locate() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.location = pos.coords;
    });
  }
}

var isValidPW(passwd) {
  if(Number(passwd).toString() === "NaN" || passwd.length != 4) {
    return false;
  }
  return true;

}
var isValidName(hubName){
  if(hubName.length < 4) {
    return false;
  }
  return true;
}
