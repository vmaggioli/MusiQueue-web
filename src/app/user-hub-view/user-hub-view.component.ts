import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QueueService } from '../shared/queue.service';
import { YoutubeService } from '../shared/youtube.service';
import { HubService } from '../shared/hub.service';
import { UsersService } from '../shared/users.service';
import { User } from '../objects/user';
import { Song } from '../objects/song';
import { Hub } from '../objects/hub';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'lsl-user-hub-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-hub-view.component.html',
  styleUrls: ['./user-hub-view.component.css'],
  providers: [QueueService, YoutubeService]
})
export class UserHubViewComponent {

  public itemList: FirebaseListObservable<any[]>;
  public isQueue: boolean = true;
  public isSongs: boolean = false;
  public currentHub: Hub;
  public songs: Song[];
  public users: User[];

  constructor(
    private route: ActivatedRoute,
    public usersService: UsersService,
    public queueService: QueueService,
    public youtubeService: YoutubeService,
    public hubService: HubService) {

   }

   ngOnInit() {
     this.queueService.getQueue(this.hubService.currentHub.name).subscribe(items => {
       this.sortQueue(items);
     });
   }

   sortQueue(items): number {
     this.songs = items;
     this.songs.sort((a, b) => {
       let ar: number = a.rank;
       let br: number = b.rank;
       let ad: number = a.time_added;
       let bd: number = b.time_added;
       if (ar < br) return 1;
       else if (ar > br) return -1;
       else if (ad < bd) return -1;
       else if (ad > bd) return 1;
       else return 0;
     });
     this.itemList = this.songs;
   }

  onItemClicked(youtubeItem) {
    if (!this.isSongs) return;
    var title = youtubeItem.snippet.title;
    var thumbnail = youtubeItem.snippet.thumbnails.default.url; //there are other sizes
    var videoId = youtubeItem.id.videoId;
    this.queueService.addSong(title, thumbnail, videoId, this.hubService.currentHub.name);
    this.onSelected("queue");
  }

  onSelected(tab: string) {
    if (tab == "songs") {
      this.isQueue = false;
      this.isSongs = true;
      this.itemList = [];
    }
    else if (tab == "queue") {
      this.isSongs = false;
      this.isQueue = true;
      this.queueService.getQueue(this.hubService.currentHub.name).subscribe(items => {
        this.sortQueue(items);
      });
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

  upvote(song) {
    this.queueService.upvote(song);
  }

  downvote(song) {
    this.queueService.downvote(song);
  }

}
