import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class QueueService {
  public queue: FirebaseListObservable<any[]> = [];
  public retQueue: FirebaseListObservable<any[]> = [];

  constructor(public db: AngularFireDatabase) { }

  getQueue(hubUID: string) {
    this.queue = this.db.list('/Songs', {preserveSnapshot:true});
    this.queue.subscribe(snapshots => {
      snapshots.forEach(snap => {
        var isPresent = false;
        this.retQueue.forEach(song => {
          if (song.song_name == snap.val().song_name)
            isPresent = true;
        });
        if (!isPresent)
          this.retQueue.push(snap.val());
      })
    });
    return this.retQueue;
  }

  addSong(title: string, thumbnail: string, videoId: string, hubId: string) {
    var songsRef = firebase.database().ref('Songs/');
    songsRef.child(videoId).set({
      down_votes: 0,
      hub_id: hubId,
      playing: false,
      song_name: title,
      time_added: Date.now(),
      up_votes: 0,
      user_id: "not implemented yet",
      thumbnail: thumbnail
    });
  }

}
