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
import * as firebase from 'firebase/app';
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
  public isUpvoted: boolean;
  public isDownvoted: boolean;
  public currentSong: Song;

  constructor(
    private route: ActivatedRoute,
    public usersService: UsersService,
    public queueService: QueueService,
    public youtubeService: YoutubeService,
    public hubService: HubService) {

     }

  ngOnInit() {
    firebase.database().ref("Hubs/" + this.hubService.currentHub.name + "/current_song").once("value", s => {
      if (s.val() != null && s.val() != undefined) {
        this.currentSong = new Song (
          s.val().down_votes, s.val().hub_id, s.val().playing, s.val().rank, s.val().song_name,
          s.val().thumbnail, s.val().time_added, s.val().up_votes, s.val().user_id,
          s.val().username, s.val().video_id);
        this.currentSong.video_id = s.val().video_id;
        console.log("video: " + this.currentSong.video_id);
        this.hasSongs = true;
      }
    });
    this.queueService.getQueue(this.hubService.currentHub.name).subscribe(items => {
      this.sortQueue(items);
    });
  }
  sortQueue(items) {
    console.log("entering sort");
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
    if (this.currentSong == undefined && this.songs.length > 0) {
      this.currentSong = this.songs[0];
      this.hasSongs = true;
      this.queueService.removeSong(this.hubService.currentHub.name, this.songs[0].video_id);
      this.queueService.setCurrent(this.currentSong, this.hubService.currentHub.name);
    }
    else if (this.currentSong != undefined)
      this.hasSongs = true;
    else
      this.hasSongs = false;
    if (this.state < 1 && this.hasSongs)
      this.player.loadVideoById(this.currentSong.video_id);
  }

  savePlayer (player) {
    this.player = player;
    console.log("vidID : " + this.currentSong.video_id);
    if (this.state != -1)
      this.player.loadVideoById(this.currentSong.video_id);
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
        this.currentSong = undefined;
        if (this.songs.length > 0) {
          this.currentSong = this.songs[0];
          this.queueService.removeSong(this.hubService.currentHub.name, this.songs[0].video_id);
          this.queueService.setCurrent(this.currentSong, this.hubService.currentHub.name);
        }
        if (this.currentSong != undefined)
          this.player.loadVideoById(this.currentSong.video_id);
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
    if (this.currentSong == undefined) {
      this.currentSong = new Song(
        0, this.hubService.currentHub.name, false, 0, title,
        thumbnail, Date.now(), 0, this.usersService.currentUser.uid,
        this.usersService.currentUser.username, videoId
      );
      this.queueService.setCurrent(this.currentSong, this.hubService.currentHub.name);
    }
    else
      this.queueService.addSong(title, thumbnail, videoId, this.hubService.currentHub.name);
    this.hasSongs = true;
    this.onSelected("queue");
  }

  onSelected(tab: string) {
    if (tab == "users") {
      this.isQueue = false;
      this.isSongs = false;
      this.isUsers = true;
      this.hubService.getHubUsers(this.hubService.currentHub.name).subscribe(users => {
        this.hubUsers = [];
        users.forEach(user => {
          console.log("adding users");
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
    if(0==input.length)
    {
      confirm("Please enter a value");
      return;
    }
    this.ytsongs = [];
    this.ytsongs = this.youtubeService.search(input);
  }

  upvote(song) {
    this.queueService.upvote(song);
  }

  downvote(song) {
    this.queueService.downvote(song);
  }

  isSongUpvoted(song, callback) {
    var songRef  = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id);
    function songUpvoted(callback) {
      songRef.once("value", vote => {
        var isUpvoted = false;
        if (vote.val() != null) {
          if (vote.val().songVote == "upvote") {
            isUpvoted = true;
          } else {
            isUpvoted = false;
          }
        } else {
          isUpvoted = false;
        }
        callback(isUpvoted);
      });
    }
    var voteStatus = function(isUpvoted) {
      return isUpvoted;
    }

    songUpvoted(voteStatus);
  }

  isSongDownvoted(song) {
    var songRef  = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id);
    songRef.once("value", vote => {
      if (vote.val() != null) {
        if (vote.val().songVote == "downvote") {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  }

  removeUser(user) {
    if (confirm("Are you sure you want to remove " + user.username + "?")) {
      this.hubService.removeUser(this.hubService.currentHub.name, user);
      this.usersService.addToKickedList(this.hubService.currentHub.name, user.uid);
    }
  }

  removeSong(song) {
    if (confirm("Are you sure you want to remove " + song.song_name + "?")) {
      this.hubService.removeSong(this.hubService.currentHub.name, song);
    }
  }

}
