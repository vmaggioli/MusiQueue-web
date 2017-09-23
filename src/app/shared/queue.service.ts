import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Song } from '../objects/song';
import { AuthService } from './auth.service';

@Injectable()
export class QueueService {
  public queue: FirebaseListObservable<Song[]> = [];
  public retQueue: FirebaseListObservable<any[]> = [];

  constructor(public db: AngularFireDatabase
              private auth: AuthService) { }

  getQueue(hubUID: string): FirebaseListObservable<Song[]> {
    return this.db.list('/Songs', {presserveSnapshot:true,
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
      user_id: this.auth.getCurrentUser().displayName,
      thumbnail: thumbnail,
      rank: date
    });
  }

  removeSong(hubId: string, videoId: string): FirebaseListObservable<Song[]> {
    this.db.object('/Songs/'+hubId+videoId).remove();
    this.getQueue(hubId).subscribe(songs => {
      this.queue = songs;
      console.log(this.queue);
    })
    return this.queue;
  }
  
  upvote(song) {
    console.log("yo");
    this.db.object('/Songs/'+song.hub_id+song.video_id+"/").update({
      up_votes: song.up_votes+1;
    });
  }
  
  downvote(song) {
    this.db.object('/Songs'+song.hub_id+song.video_id).update({
      down_votes: song.down_votes+1;
    });
  }

}
