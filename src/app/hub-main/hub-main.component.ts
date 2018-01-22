import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../objects/user';
import { UsersService } from '../shared/users.service';
import { QueueService } from '../shared/queue.service';
import { HubService } from '../shared/hub.service';
import { YoutubeService } from '../shared/youtube.service';
import { TopSongsService } from '../shared/top-songs.service';
import { MessagesService } from '../shared/messages.service';
import { YouTubePlayer } from 'youtube-player';
import { Song } from '../objects/song';
import { Hub } from '../objects/hub';
import { Vote } from '../objects/vote';
import { YTSong } from '../objects/YTsong';
import { Message } from '../objects/message';
import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'hub-main',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hub-main.component.html',
  styleUrls: ['./hub-main.component.css'],
  providers: [QueueService, YoutubeService, TopSongsService, MessagesService],
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
  public isChat: boolean = false;
  public songs: Song[];
  public ytsongs: YTSong[];
  public hubUsers: User[];
  public isUpvoted: boolean;
  public isDownvoted: boolean;
  public currentSong: Song;
  public votedSongs: Vote[];
  public tabIdx: number;
  public messages: Message[];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public usersService: UsersService,
    public queueService: QueueService,
    public youtubeService: YoutubeService,
    public hubService: HubService,
    public topSongsService: TopSongsService,
    public messagesService: MessagesService,
  ) {

     }

  ngOnInit() {
    firebase.database().ref("Hubs/" + this.hubService.currentHub.name + "/current_song").once("value", s => {
      if (s.val() != null && s.val() != undefined) {
        let down_votes = s.val().down_votes;
        let hub_id = s.val().hub_id;
        let playing = false;
        let rank = s.val().rank;
        let song_name = s.val().song_name;
        let thumbnail = s.val().thumbnail;
        let time_added = s.val().time_added;
        let up_votes = s.val().up_votes
        let user_id = s.val().user_id;
        let username = s.val().username;
        let video_id = s.val().video_id;
        this.currentSong = new Song (down_votes, hub_id, playing, rank, song_name, thumbnail, time_added, up_votes, user_id, username, video_id);
        this.currentSong.video_id = s.val().video_id;
        this.currentSong.username = username;
        this.hasSongs = true;
      }
    });
    this.queueService.getQueue(this.hubService.currentHub.name).subscribe(items => {
      this.sortQueue(items);
    });

    this.queueService.getVotes(this.usersService.currentUser.uid).subscribe(songs => {
      this.votedSongs = [];
      songs.forEach(s => {
        let key = s.$key;
        if (this.hubService.currentHub.name.length <= key.length) {
          let hubName = key.substring(0, this.hubService.currentHub.name.length);
          let videoId = key.substring(this.hubService.currentHub.name.length);
          if (hubName == this.hubService.currentHub.name) {
            this.votedSongs.push(new Vote(s.songVote, hubName, videoId));
          }
        }
      });
    });
    this.usersService.updateUserActivity(this.usersService.currentUser.uid, this.hubService.currentHub.name);
    this.messagesService.cleanMessages(this.hubService.currentHub.name);
  }
  sortQueue(items) {
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
    this.player.a.height = 200;
    this.player.a.width = 300;
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
    switch (event.data) {
      case 0:
        this.state = 0;
        this.currentSong = undefined;
        if (this.songs.length > 0) {
          this.currentSong = this.songs[0];
          this.queueService.removeSong(this.hubService.currentHub.name, this.songs[0].video_id);
          this.queueService.setCurrent(this.currentSong, this.hubService.currentHub.name);
        }
        if (this.currentSong != undefined)
          this.player.loadVideoById(this.currentSong.video_id);
        else
          this.queueService.removeCurrent(this.hubService.currentHub.name);
        break;
      case 1:
      this.state = 1;
        break;
      case 2:
      this.state = 2;
        break;
      case 3:
      this.state = 3;
        break;
      case 5:
      this.state = 5;
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
    var abort = false;
    this.songs.forEach(song => {
      if (song.video_id == videoId) {
        confirm(song.song_name + " is already on the queue");
        abort = true;
      }
    });
    if (abort) return;
    this.topSongsService.addTopSong(this.usersService.currentUser.uid, videoId, title, thumbnail);
    if (this.currentSong == undefined) {
      this.currentSong = new Song(0, this.hubService.currentHub.name, false, 0, title,thumbnail, Date.now(), 0, this.usersService.currentUser.uid,this.usersService.currentUser.username, videoId);
      this.currentSong.username = this.usersService.currentUser.username;
      this.currentSong.video_id = videoId;
      this.queueService.setCurrent(this.currentSong, this.hubService.currentHub.name);
    }
    else
      this.queueService.addSong(title, thumbnail, videoId, this.hubService.currentHub.name);
    this.hasSongs = true;
    this.tabIdx = 0;
    this.onSelected(0);
  }

  onSelected(tab) {
    if (this.tabIdx == 2) {
      this.isQueue = false;
      this.isSongs = false;
      this.isChat = false;
      this.isUsers = true;
      this.hubService.getHubUsers(this.hubService.currentHub.name).subscribe(users => {
        this.hubUsers = [];
        users.forEach(user => {
          this.usersService.getUserById(user.$key).subscribe(User => {
            this.hubUsers.push(User);
          });
        });
      });
    }
    else if (this.tabIdx == 1) {
      this.isQueue = false;
      this.isUsers = false;
      this.isChat = false;
      this.isSongs = true;
      this.ytsongs = [];
    }
    else if (this.tabIdx == 0) {
      this.isUsers = false;
      this.isSongs = false;
      this.isChat = false;
      this.isQueue = true;
      this.queueService.getQueue(this.hubService.currentHub.name).subscribe(items => {
        this.sortQueue(items);
      });
    }
    else if (this.tabIdx == 3) {
      this.isUsers = false;
      this.isSongs = false;
      this.isQueue = false;
      this.isChat = true;
      this.messagesService.cleanMessages(this.hubService.currentHub.name);
      this.messagesService.getMessages(this.hubService.currentHub.name).subscribe(m => {
        this.messages = m;
        this.messages.sort((a, b) => {
          if (a.time < b.time) return -1;
          else if (a.time > b.time) return 1;
          else return 0;
        });
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

  upIsPressed(song): boolean {
    var toReturn: boolean;
    this.votedSongs.forEach(s => {
      if (s.video_id == song.video_id) {
        if (s.vote_status == "upvote") {
          toReturn = true;
        } else {
          toReturn = false;
        }
      }
    });
    return toReturn;
  }

  downIsPressed(song) {
    var toReturn: boolean;
    this.votedSongs.forEach(s => {
      if (s.video_id == song.video_id) {
        if (s.vote_status == "downvote") {
          toReturn = true;
        } else {
          toReturn = false;
        }
      }
    });
    return toReturn;
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

  onUserClicked(user) {
    if(confirm("Are you sure you want to leave the page? The music will stop playing.")) {
      this.router.navigate(['user-profile', user]);
    }
  }

  onMessageSend(message) {
    this.messagesService.addMessage(this.hubService.currentHub.name, this.usersService.currentUser.uid, this.usersService.currentUser.username, message);
  }

}
