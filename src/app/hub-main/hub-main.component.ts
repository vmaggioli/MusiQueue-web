import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../objects/user';
import { UsersService } from '../shared/users.service';
import { QueueService } from '../shared/queue.service';
import { YoutubeService } from '../shared/youtube.service';
import { YouTubePlayer } from 'youtube-player';
import { Song } from '../objects/song';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'hub-main',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hub-main.component.html',
  styleUrls: ['./hub-main.component.css'],
  providers: [UsersService, QueueService, YoutubeService],
})

export class HubMainComponent  {
  player: YT.Player;
  private id: string = '';
  private state: number;
  public itemList: FirebaseListObservable<any[]>;
  private name: string = "UniqueHub";
  private sub: any;
  public isSongs: boolean = false;
  public isUsers: boolean = false;
  public songs: Song[];
  public users: User[];


  constructor(
    private route: ActivatedRoute
    public usersService: UsersService,
    public queueService: QueueService,
    public youtubeService: YoutubeService) {
      //this.itemList = this.queueService.getQueue(this.name);
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
    })
    console.log("MY NAME IS" + this.name);
    this.queueService.getQueue("UniqueHub").subscribe(items => {
      this.songs = items;
      this.songs.sort((a, b) => {
        let ar: number = a.rank;
        let br: number = b.rank;
        if (ar < br) return -1;
        else if (ar >= br) return 1;
        else return 0;
      });
      this.itemList = this.songs;
      if (this.songs.length > 0)
        this.id = this.songs[0].video_id;
    })
  }

  savePlayer (player) {
    this.player = player;
    console.log('player instance', this.player)
    if (this.state != -1)
      this.player.loadVideoById(this.id);
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
    switch (event.data) {
      case 0:
        console.log("finished");
        this.state = 0;
        if (this.songs.length > 1)
          this.player.loadVideoById(this.songs[1].video_id);
        this.songs = this.queueService.removeSong(this.name, this.songs[0].video_id)
        break;
      case 1:
      this.state = 1;
        console.log("video is playing");
        break;
      case 2:
      this.state = 2;
        console.log("video is paused");
        break;
      case 3:
      this.state = 3;
        console.log("video is buffering");
        break;
      case 5:
      this.state = 5;
        console.log("video is cued");
        break;
      default:
        break;
    }
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
      this.queueService.getQueue(this.name).subscribe(items => {
        this.songs = items;
        this.songs.sort((a, b) => {
          let ar: number = a.rank;
          let br: number = b.rank;
          if (ar < br) return -1;
          else if (ar >= br) return 1;
          else return 0;
        });
        this.itemList = this.songs;
        console.log("len: " this.songs.length);
        if (this.songs.length > 0 && this.state < 1) {
          this.id = this.songs[0].video_id;
          this.player.playVideo();
        }
      })

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
