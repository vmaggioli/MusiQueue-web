import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../objects/user';

@Component({
  selector: 'hub-users',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hub-users.component.html',
  styleUrls: ['./hub-users.component.css']
})

export class HubUsersComponent implements OnInit {
  player: YT.Player;
  private id: string = 'qDuKsiwS5xw';

  users: User[];

  savePlayer (player) {
    this.player = player;
    console.log('player instance', player)
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

  constructor() { }

  ngOnInit() {
  }

}
