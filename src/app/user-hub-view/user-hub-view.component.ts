import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QueueService } from '../shared/queue.service';
import { YoutubeService } from '../shared/youtube.service';
import { HubService } from '../shared/hub.service';
import { UsersService } from '../shared/users.service';
import { User } from '../objects/user';
import { Song } from '../objects/song';
import { Hub } from '../objects/hub';
import { Vote } from '../objects/vote';
import { YTSong } from '../objects/YTsong';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'lsl-user-hub-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-hub-view.component.html',
  styleUrls: ['./user-hub-view.component.css'],
  providers: [QueueService, YoutubeService]
})
export class UserHubViewComponent {

  public songList: FirebaseListObservable<YTSong[]>;
  public queueList: FirebaseListObservable<Song[]>;
  public isQueue: boolean = true;
  public isSongs: boolean = false;
  public isUsers: boolean = false;
  public currentHub: Hub;
  public songs: Song[];
  public ytsongs: YTSong[];
  public users: User[];
  public  hubn: string ='';
  public currentSong: Song;
  public votedSongs: Vote[];
  public tabIdx: number;

  constructor(
    private route: ActivatedRoute,
    public usersService: UsersService,
    public queueService: QueueService,
    public youtubeService: YoutubeService,
    public hubService: HubService,
    public router: Router) {

   }

   ngOnInit() {
     firebase.database().ref("Hubs/" + this.hubService.currentHub.name).on("child_changed", s1 => {
       if (s1.key == "current_song") {
         this.queueService.getCurrent(this.hubService.currentHub.name).subscribe(s => {
           if (s != null && s != undefined) {
             this.currentSong = new Song(s.down_votes, s.hub_id, false, s.rank, s.song_name,
               s.thumbnail, s.time_added, s.up_votes, s.user_id, s.username, s.video_id);
             //this.currentSong.username = s.username;
             //this.currentsong.video_id = s.video_id;
           }
         });
       }
     });
     this.queueService.getCurrent(this.hubService.currentHub.name).subscribe(s => {
       if (s != null && s != undefined) {
         this.currentSong = new Song(s.down_votes, s.hub_id, false, s.rank, s.song_name,
           s.thumbnail, s.time_added, s.up_votes, s.user_id, s.username, s.video_id);
         //this.currentSong.username = s.username;
         //this.currentsong.video_id = s.video_id;
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
     this.hubn = this.hubService.currentHub.name;

     // listen for if user gets kicked out
     this.usersService.listenForBoot();
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
    if (this.currentSong == undefined) {
      this.currentSong = new Song(0, this.hubService.currentHub.name, false, 0, title,thumbnail, Date.now(), 0, this.usersService.currentUser.uid,this.usersService.currentUser.username, videoId);
      this.currentSong.username = this.usersService.currentUser.username;
      this.currentSong.video_id = videoId;
      this.queueService.setCurrent(this.currentSong, this.hubService.currentHub.name);
    }
    else
      this.queueService.addSong(title, thumbnail, videoId, this.hubService.currentHub.name);
    this.tabIdx = 0;
    this.onSelected(0);
  }

  onSelected(tab) {
    if (this.tabIdx == 2) {
      this.isQueue = false;
      this.isSongs = false;
      this.isUsers = true;
      this.hubService.getHubUsers(this.hubService.currentHub.name).subscribe(users => {
        this.hubUsers = [];
        users.forEach(user => {
          this.hubUsers.push(user);
        });
      });
    }
    else if (this.tabIdx == 1) {
      this.isQueue = false;
      this.isSongs = true;
      this.ytsongs = [];
    }
    else if (this.tabIdx == 0) {
      this.isSongs = false;
      this.isQueue = true;
      this.queueService.getQueue(this.hubService.currentHub.name).subscribe(items => {
        this.sortQueue(items);
      });
    }
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


  onSearch(input: string) {
    this.ytsongs = [];
    this.ytsongs = this.youtubeService.search(input);
  }

  upvote(song) {
    this.queueService.upvote(song);
  }

  downvote(song) {
    this.queueService.downvote(song);
  }

  leaveHub() {
    this.router.navigate(['/']);
  }

}
