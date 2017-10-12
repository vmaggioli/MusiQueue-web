import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';


@Component({
  selector: 'create-join',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-join.component.html',
  styleUrls: ['./create-join.component.css']
})

export class CreateJoinComponent {

  name: string;
  constructor(
    private router: Router,
    public usersService: UsersService) {

  }
  
  ngOnInit() {
    
  }
  
  gotoJoinHub(name:string) {
    this.name = name;
    if (name.length > 0) {
      this.usersService.updateUsername(this.usersService.currentUser.uid, this.name);
    }
    else {
      this.usersService.updateUsername(this.usersService.currentUser.email, this.name);
    }
    this.router.navigate(['join-hub']);
  }
  
  gotoCreateHub(name:string) {
    this.name = name;
    if (name.length > 0) {
      this.usersService.updateUsername(this.usersService.currentUser.uid, name);
    }
    else {
      this.usersService.updateUsername(this.usersService.currentUser.email, name);
    }
    this.router.navigate(['create-hub']); 
  }
}
