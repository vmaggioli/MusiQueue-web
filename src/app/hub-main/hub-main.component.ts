import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../objects/user';
import { UsersService } from '../shared/users.service';
import { QueueService } from '../shared/queue.service';

@Component({
  selector: 'hub-main',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hub-main.component.html',
  styleUrls: ['./hub-main.component.css'],
  providers: [UsersService, QueueService]
})

export class HubMainComponent  {
  player: YT.Player;
  private id: string = 'qDuKsiwS5xw';
  public itemList: FirebaseListObservable<any[]>;
  name: string = "UniqueHub"
  public isQueue: boolean = true;
  public isSongs: boolean = false;
  public isUsers: boolean = false;

  constructor(
    public usersService: UsersService,
    public queueService: QueueService) {
   }

  ngOnInit() {
  }

  savePlayer (player) {
    this.player = player;
    console.log('player instance', player)
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

  onSelected(tab: string) {
    if (tab == "users") {
      this.isQueue = false;
      this.isSongs = false;
      this.isUsers = true;
      console.log("logging: " this.usersService.getHubUsers(this.name));
      this.itemList = this.usersService.getHubUsers(this.name);
    }
    else if (tab == "songs") {
      this.isQueue = false;
      this.isUsers = false;
      this.isSongs = true;
      this.itemList = [];
    }
    else if (tab == "queue") {
      this.isUsers = false;
      this.isSongs = false;
      this.isQueue = true;
      console.log("logging: " this.queueService.getQueue(this.name));
      this.itemList = this.queueService.getQueue(this.name);

    }
  }
}
