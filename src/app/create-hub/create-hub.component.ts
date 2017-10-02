import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ParamMap} from '@angular/router';
import { HubService } from '../shared/hub.service';
import { UsersService } from '../shared/users.service';
import { Hub } from '../objects/hub';

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

    console.log(Number(this.passwd));
    console.log(this.name);
    if(isValidPW(this.passwd) && isValidName(this.name)) {
      this.hubService.currentHub = new Hub(this.name, "user", "user", this.passwd, "date", [], []);
      console.log("hub name is: " + this.hubService.currentHub.name);
      this.hubService.createHub("false", "user", "date", "lat", "long", this.name, this.passwd, "users", "wifi");
      this.usersService.addUserToHub(this.usersService.currentUser.uid, this.name);
      this.router.navigate(['hub-main',{name: this.name}]);
    }
    else(console.log("invalid name or passwd"))
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
