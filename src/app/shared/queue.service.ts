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
  public currentSong: Song;

  constructor(public db: AngularFireDatabase,
              private auth: AuthService,
              private usersService: UsersService) { }

  getQueue(hubUID: string): FirebaseListObservable<Song[]> {
    /*var currentSongRef = firebase.database().ref("Hubs/" + hubUID + "/currentlyPlaying");
    currentSongRef.once("value", song => {
      if (song.val() != null) {
        this.currentSong = song.val(); //new Song(song.val().down_votes, song.val().hub_id, song.val().playing, 0, song.val().song_name, song.val().thumbnail, song.val().time_added, 0, song.val().user_id, song.val().video_id;
        
      }
    });*/
    //var currentSong = this.db.list("Hubs/" + hubUID + "/currentlyPlaying");
    var restOfList = this.db.list('/Songs', {
      query: {
        orderByChild: 'hub_id',
        equalTo: hubUID
      }
    });
    /*this.queue = currentSong;
    restOfList.subscribe(songs => {
      songs.forEach(song => {
        console.log(song.hub_id);
        this.queue.push(song);
      });
    });*/
    /*restOfList.forEach(song => {
      this.queue.push(song);
    });*/
    return restOfList;
    /*return this.db.list('/Songs', {
      query: {
        orderByChild: 'hub_id',
        equalTo: hubUID
      }
    });*/
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

  removeSong(hubId: string, song:Song) {
    var songRef = firebase.database().ref('Hubs/' + hubId + '/currentlyPlaying' + song.hub_id + song.video_id);
    songRef.remove();
  }

  removeSongFromPlaylist(song) {
    var songRef = firebase.database().ref("Songs/" + song.hub_id + song.video_id);
    songRef.remove();
    firebase.database().ref("Users/" + song.user_id + "/songs/" + name + song.video_id).remove();
    var songVoteRef = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id);
    songVoteRef.once("value", songID => {
      if (songID.val() != null) {
        songVoteRef.remove();
      }
    });
  }

  upvote(song) {
    var ref = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id);
    ref.once("value", songID => {
      console.log("songID: " + songID.val());
      if (songID.val() == null || songID.val().songVote == "null") {
        var songRef = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/up_votes');
        songRef.transaction(function(upvotes) {
          return upvotes + 1;
        });
        var songRef2 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank');
        songRef2.transaction(function(rank) {
          return rank + 1;
        });

        var songToUpvote = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs");
        songToUpvote.child(song.hub_id + song.video_id).update({
          songVote: "upvote"
        });
      } else if (songID.val().songVote == "downvote") {
        var songRef1 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/down_votes');
        songRef1.transaction(function(downvotes) {
          return downvotes - 1;
        });
        var songRef2 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/up_votes');
        songRef2.transaction(function(upvotes) {
          return upvotes + 1;
        });
        var songRef3 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank');
        songRef3.transaction(function(rank) {
          return rank + 2;
        });

        var songToUpvote = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs");
        songToUpvote.child(song.hub_id + song.video_id).update({
          songVote: "upvote"
        });
      } else if (songID.val().songVote == "upvote") {
        //console.log("no double voting!!");
        var songRef1 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/up_votes');
        songRef1.transaction(function(upvotes) {
          return upvotes - 1;
        });
        var songRef1 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank');
        songRef1.transaction(function(rank) {
          return rank - 1;
        });

        var songToNeutralState = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs");
        songToNeutralState.child(song.hub_id + song.video_id).update({
          songVote: "null"
        });
      }
    });


  }

  downvote(song) {
    var ref = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs/" + song.hub_id + song.video_id);
    ref.once("value", songID => {
      if (songID.val() == null || songID.val().songVote == "null") {
        var songRef = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/down_votes');
        songRef.transaction(function(downvotes) {
          return downvotes + 1;
        });
        var songRef2 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank');
        songRef2.transaction(function(rank) {
          return rank - 1;
        });

        var songToDownvote = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs");
        songToDownvote.child(song.hub_id + song.video_id).update({
          songVote: "downvote"
        });
      } else if (songID.val().songVote == "upvote") {
        var songRef1 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/up_votes');
        songRef1.transaction(function(upvotes) {
          return upvotes - 1;
        });
        var songRef2 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/down_votes');
        songRef2.transaction(function(downvotes) {
          return downvotes + 1;
        });
        var songRef3 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank');
        songRef3.transaction(function(rank) {
          return rank - 2;
        });

        var songToDownvote = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs");
        songToDownvote.child(song.hub_id + song.video_id).update({
          songVote: "downvote"
        });
      } else if (songID.val().songVote == "downvote") {
        //console.log("no double voting!!");
        var songRef1 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/down_votes');
        songRef1.transaction(function(downvotes) {
          return downvotes - 1;
        });
        var songRef2 = firebase.database().ref('/Songs/'+song.hub_id+song.video_id+'/rank');
        songRef2.transaction(function(rank) {
          return rank + 1;
        });

        var songToNeutralState = firebase.database().ref("Users/" + this.usersService.currentUser.uid + "/songs");
        songToNeutralState.child(song.hub_id + song.video_id).update({
          songVote: "null"
        });
      }
    });
  }

}
