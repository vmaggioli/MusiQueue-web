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
      user_id: this.usersService.currentUser.uid,
      username: this.usersService.currentUser.username,
      thumbnail: thumbnail,
      rank: 0
    });
  }

  removeSong(hubId: string, videoId: string) {
    var songRef = firebase.database().ref('Songs/' + hubId + videoId);
    songRef.remove();
    var songVoteRef = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + hubId + videoId);
    songVoteRef.once("value", songID => {
      if (songID.val() != null) {
        songVoteRef.remove();
      }
    });
  }

  setCurrent(song, hubId) {
    firebase.database().ref("Hubs/").child(hubId).update(
      {
        current_song: {
          down_votes: song.down_votes,
          hub_id: hubId,
          rank: song.rank,
          song_name: song.song_name,
          thumbnail: song.thumbnail,
          time_added: song.time_added,
          up_votes: song.up_votes,
          user_id: song.user_id,
          username: song.username,
          video_id: song.video_id
        }
      });
  }
  getCurrent(hubid) {
    return this.db.object("Hubs/" + hubid + "/current_song");
  }
  removeCurrent(hubId) {
    firebase.database().ref("Hubs/" + hubId + "/current_song").remove();
  }
  getVotes(user) {
    return this.db.list("Users/" + user + "/songs");
  }

  upvote(song) {
    var ref = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id);
    ref.once("value", songID => {

      if (songID.val() == null || songID.val().songVote == "null") {
        firebase.database().ref("Users/" + song.user_id + "/upvotes").transaction(function(upvotes) {
          if (upvotes ==  null || upvotes == 0)
            return 1;
          return upvotes + 1;
        });
        firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank').transaction(function(rank) {
          return rank + 1;
        });
        firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id + "/songVote").transaction(function(songVote) {
          return "upvote";
        });

      } else if (songID.val().songVote == "downvote") {
        firebase.database().ref("Users/" + song.user_id + "/upvotes").transaction(function(upvotes) {
          if (upvotes ==  null || upvotes == 0)
            return 1;
          return upvotes + 1;
        });
        firebase.database().ref("Users/" + song.user_id + "/downvotes").transaction(function(downvotes) {
          if (downvotes ==  null || downvotes == 0)
            return 0;
          return downvotes - 1;
        });
        firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank').transaction(function(rank) {
          return rank + 2;
        });
        firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id + "/songVote").transaction(function(songVote) {
          return "upvote";
        });

      } else if (songID.val().songVote == "upvote") {
        firebase.database().ref("Users/" + song.user_id + "/upvotes").transaction(function(upvotes) {
          if (upvotes ==  null || upvotes == 0)
            return 0;
          return upvotes - 1;
        });
        firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank').transaction(function(rank) {
          return rank - 1;
        });
        firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id + "/songVote").transaction(function(songVote) {
          return "null";
        });
      }
    });
  }

  downvote(song) {
    var ref = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id);
    ref.once("value", songID => {

      if (songID.val() == null || songID.val().songVote == "null") {
        firebase.database().ref("Users/" + song.user_id + "/downvotes").transaction(function(downvotes) {
          if (downvotes ==  null || downvotes == 0)
            return 1;
          return downvotes + 1;
        });
        firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank').transaction(function(rank) {
          return rank - 1;
        });
        firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id + "/songVote").transaction(function(songVote) {
          return "downvote";
        });

      } else if (songID.val().songVote == "upvote") {
        firebase.database().ref("Users/" + song.user_id + "/upvotes").transaction(function(upvotes) {
          if (upvotes ==  null || upvotes == 0)
            return 0;
          return upvotes - 1;
        });
        firebase.database().ref("Users/" + song.user_id + "/downvotes").transaction(function(downvotes) {
          if (downvotes ==  null || downvotes == 0)
            return 1;
          return downvotes + 1;
        });
        firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank').transaction(function(rank) {
          return rank - 2;
        });
        firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id + "/songVote").transaction(function(songVote) {
          return "downvote";
        });

      } else if (songID.val().songVote == "downvote") {
        firebase.database().ref("Users/" + song.user_id + "/downvotes").transaction(function(downvotes) {
          if (downvotes ==  null || downvotes == 0)
            return 0;
          return downvotes - 1;
        });
        firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank').transaction(function(rank) {
          return rank + 1;
        });
        firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id + "/songVote").transaction(function(songVote) {
          return "null";
        });
      }
    });
  }

}
