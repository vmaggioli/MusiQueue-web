import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../objects/user';
import { UsersService } from '../shared/users.service';
import { QueueService } from '../shared/queue.service';
import { YoutubeService } from '../shared/youtube.service';
import YouTubePlayer from 'youtube-player';


@Component({
  selector: 'hub-main',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hub-main.component.html',
  styleUrls: ['./hub-main.component.css'],
  providers: [UsersService, QueueService, YoutubeService]
})

export class HubMainComponent  {
  player: YT.Player;
  private id: string = 'qDuKsiwS5xw';
  public itemList: FirebaseListObservable<any[]>;
  name: string = "UniqueHub"
  public isQueue: boolean = true;
  public isSongs: boolean = false;
  public isUsers: boolean = false;
  public songs: object[] = [];

  constructor(
    public usersService: UsersService,
    public queueService: QueueService,
    public youtubeService: YoutubeService) {
      this.itemList = this.queueService.getQueue(this.name);
   }

  ngOnInit() {
  }

  savePlayer (player) {
    this.player = player
    console.log('player instance', player)
  }

  /*
   * Player States:
   * -1: Not Started Yet
   * 0: Finished
   * 1: Playing
   * 2: Paused
   * 3: Buffering
   * 5: Video Cued
   */
  onStateChange(event) {
    console.log('player state', event.data);
  }

  onItemClicked(youtubeItem) {
    if (!this.isSongs) return;
    var title = youtubeItem.snippet.title;
    var thumbnail = youtubeItem.snippet.thumbnails.default.url; //there are other sizes
    var videoId = youtubeItem.id.videoId;
    this.queueService.addSong(title, thumbnail, videoId, this.name);
    this.onSelected("queue");
  }

  onSelected(tab: string) {
    if (tab == "users") {
      this.isQueue = false;
      this.isSongs = false;
      this.isUsers = true;
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
      this.itemList = this.queueService.getQueue(this.name);
    }
  }

  onSearch(input: string) {
    this.songs = this.youtubeService.search(input);
    this.songs.forEach(song => {
      this.itemList = [];
      song.items.forEach(item => {
        console.log(item);
        this.itemList.push(item);
      });
    });
  }

}
