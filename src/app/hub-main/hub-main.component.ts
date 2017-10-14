import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../objects/user';
import { UsersService } from '../shared/users.service';
import { QueueService } from '../shared/queue.service';
import { HubService } from '../shared/hub.service';
import { YoutubeService } from '../shared/youtube.service';
import { YouTubePlayer } from 'youtube-player';
import { Song } from '../objects/song';
import { Hub } from '../objects/hub';
import { YTSong } from '../objects/YTsong';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'hub-main',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hub-main.component.html',
  styleUrls: ['./hub-main.component.css'],
  providers: [QueueService, YoutubeService],
})

export class HubMainComponent  {
  public player;
  private id: string = '';
  private state: number;
  public songList: FirebaseListObservable<YTSong[]>;
  public queueList: FirebaseListObservable<Song[]>;
  public userList: FirebaseListObservable<User[]>;
  public currentHub: Hub;
  public hasSongs: boolean = false;
  public isQueue: boolean = true;
  public isSongs: boolean = false;
  public isUsers: boolean = false;
  public songs: Song[];
  public ytsongs: YTSong[];
  public hubUsers: User[];


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
    this.hasSongs = (this.songs != null) && (this.songs.length > 0);
  }
  sortQueue(items) {
    this.songs = items;
    this.songs.sort((a, b) => {
      let ar: number = a.rank;
      let br: number = b.rank;
      let ad: Date = a.time_added;
      let bd: Date = b.time_added;
      if (ar < br) return 1;
      else if (ar > br) return -1;
      else if (ad < bd) return -1;
      else if (ad > bd) return 1;
      else return 0;
    });

    if (this.songs.length > 0) {
      this.id = this.songs[0].video_id;
      this.hasSongs = true;
    }
    else
      this.hasSongs = false;
    if (this.state < 1)
      this.player.playVideo();
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
        var last = this.songs.length - 1;
        this.queueService.removeSong(this.hubService.currentHub.name, this.songs[0].video_id);
        if (last == 0)
          this.hasSongs = false;
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

  onSongClicked(youtubeItem) {
    if (!this.isSongs) return;
    var title = youtubeItem.song_name;
    var thumbnail = youtubeItem.thumbnail; //there are other sizes
    var videoId = youtubeItem.video_id;
    this.queueService.addSong(title, thumbnail, videoId, this.hubService.currentHub.name);
    this.hasSongs = true;
    this.onSelected("queue");
  }

  onSelected(tab: string) {
    if (tab == "users") {
      this.isQueue = false;
      this.isSongs = false;
      this.isUsers = true;
      this.hubUsers = [];
      this.usersService.getHubUsers(this.hubService.currentHub.name).subscribe(users => {
        users.forEach(user => {
          this.hubUsers.push(user);
        });
      });
    }
    else if (tab == "songs") {
      this.isQueue = false;
      this.isUsers = false;
      this.isSongs = true;
      this.ytsongs = [];
    }
    else if (tab == "queue") {
      this.isUsers = false;
      this.isSongs = false;
      this.isQueue = true;
      this.queueService.getQueue(this.hubService.currentHub.name).subscribe(items => {
        this.sortQueue(items);
      });
    }
  }

  onSearch(input: string) {
    this.ytsongs = [];
    this.ytsongs = this.youtubeService.search(input);
  }

  upvote(song) {
    this.queueService.upvote(song);
    /*var upVote = document.getElementById("upvoteButton");
    var downVote = document.getElementById("downvoteButton");
    upVote.style.backgroundColor = "#0000ff";
    downVote.style.backgroundColor = "#FCFCFC";*/
  }

  downvote(song) {
    this.queueService.downvote(song);
    /*var upVote = document.getElementById("upvoteButton");
    var downVote = document.getElementById("downvoteButton");
    upVote.style.backgroundColor = "#FCFCFC";
    downVote.style.backgroundColor = "#0000ff";*/
  }

}
