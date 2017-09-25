import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../objects/user';

@Component({
  selector: 'hub-users',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hub-users.component.html',
  styleUrls: ['./hub-users.component.css']
})

export class HubUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
