import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Song } from '../objects/song';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Injectable()
export class QueueService {
  public queue: FirebaseListObservable<Song[]>;

  constructor(public db: AngularFireDatabase,
              private auth: AuthService,
              private usersService: UsersService) { }

  getQueue(hubUID: string): FirebaseListObservable<Song[]> {
    return this.db.list('/Songs', {
      query: {
        orderByChild: 'hub_id',
        equalTo: hubUID
      }
    });
  }

  addSong(title: string, thumbnail: string, videoId: string, hubId: string) {
    var songsRef = firebase.database().ref('Songs/');
    var date = Date.now();
    songsRef.child(hubId+videoId).set({
      video_id: videoId,
      down_votes: 0,
      hub_id: hubId,
      playing: false,
      song_name: title,
      time_added: date,
      up_votes: 0,
      user_id: this.auth.getCurrentUser().uid,
      username: this.usersService.currentUser.username,
      thumbnail: thumbnail,
      rank: 0
    });
  }

  removeSong(hubId: string, videoId: string): FirebaseListObservable<Song[]> {
    this.db.object('/Songs/'+hubId+videoId).remove();
    this.getQueue(hubId).subscribe(songs => {
      songs.forEach(s => {
        this.queue.push(s);
      });
      console.log(this.queue);
    })
    return this.queue;
  }

  upvote(song) {
    var songRef = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/up_votes');
    songRef.transaction(function(upvotes) {
      return upvotes + 1;
    });
    var songRef2 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank');
    songRef2.transaction(function(rank) {
      return rank + 1;
    });
  }

  downvote(song) {
    var songRef = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/down_votes');
    songRef.transaction(function(downvotes) {
      return downvotes + 1;
    });
    var songRef2 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank');
    songRef2.transaction(function(rank) {
      return rank - 1;
    });
  }

}
