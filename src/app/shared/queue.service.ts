import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Song } from '../objects/song';

@Injectable()
export class QueueService {
  public queue: FirebaseListObservable<Song[]> = [];
  public retQueue: FirebaseListObservable<any[]> = [];

  constructor(public db: AngularFireDatabase) { }

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
    songsRef.child(videoId).set({
      down_votes: 0,
      hub_id: hubId,
      playing: false,
      song_name: title,
      time_added: date,
      up_votes: 0,
      user_id: "not implemented yet",
      thumbnail: thumbnail,
      rank: date
    });
  }

}
