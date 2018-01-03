import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { TopSong } from '../objects/topSong';

@Injectable()
export class TopSongsService {

  constructor(public db: AngularFireDatabase,) { }


  /*
    None of this function is returning anything. it will all happen asynchronously
    so it doesn't matter much if it takes a second or two to complete
   */
  addTopSong(userid, songId, title, thumbnail) {
    firebase.database().ref("/TopSongs/" + userid + "/num_songs").once('value', snap => {
      var ref = firebase.database().ref("/TopSongs/" + userid);

      // FIRST SONG ADDED BY USER
      if (snap.val() == null || snap.val() == 0) {
        ref.update({
          num_songs: 1
        });
        ref.child(songId).update({
          count: 1,
          time_added: Date.now(),
          title: title,
          thumbnail: thumbnail,
        });
      }
      else {
        ref.child(songId).once('value', snap2 => {

          // UPDATE COUNT AND TIME IF SONG PREVIOUSLY ADDED
          if (snap2.val() != null) {
            ref.child(songId).update({
              time_added: Date.now()
            });
            ref.child(songId + "/count").transaction(function(count) {
              if (count == null)
                return 1;
              return count + 1;
            });
          }

          // ADD SONG TO LIST IF LESS THAN 30 ARE IN THE LIST
          else if (snap.val() < 30) {
            ref.child("/num_songs").transaction(function(count) {
              return count + 1;
            });
            ref.child(songId).update({
              count: 1,
              time_added: Date.now(),
              title: title,
              thumbnail: thumbnail,
            });
          }

          // ALGORITHM FOR CACHING 30 TOP SONGS
          else {
            ref.once('value', snap3 => {
              let songs: TopSong[] = new Array(30);
              let i: number = 0;

              // CREATE LIST OF SONGS
              snap3.forEach(song => {
                if (song.key != "num_songs") {
                  songs[i] = new TopSong(song.key, song.child("time_added").val(), song.child("count").val(),
                    song.child("title").val(), song.child("thumbnail").val());
                  i = i + 1;
                }
              });

              // SORT LIST BY COUNT FIRST, THEN TIME ADDED
              // SMALLEST COUNT FIRST AND OLDEST TIME FIRST
              songs.sort((a, b) => {
                let ac: number = a.num_played;
                let bc: number = b.num_played;
                let at: number = a.time_added;
                let bt: number = b.time_added;
                if (ac < bc) return -1;
                else if (bc < ac) return 1;
                else if (at < bt) return -1;
                else if (bt < at) return 1;
                return 0;
              });

              // GET ALL SONGS THAT HAVE ONLY BEEN PLAYED ONCE
              let lowestList = songs.filter(s => {
                return (s.num_played == 1);
              });

              // IF THERE IS ONLY ONE SONG WITH A COUNT OF 1 THEN IT WILL CONSTANTLY
              // GET REPLACED AND WILL LIKELY NEVER GET A CHANCE TO MOVE UP THE LIST
              let nextTry: number = 2;
              while (lowestList.length == 1 && nextTry < 20) {
                lowestList = songs.filter(s => {
                  return (s.num_played == nextTry);
                })
                nextTry = nextTry + 1;
              }

              // IF 'NEXTTRY' IS LESS THAN 20 THEN IT FOUND A BLOCK OF SONGS THAT HAS
              // THE SAME VALUE FOR 'NUM_PLAYED' AND WE SELECT THE OLDEST ONE TO REPLACE
              // WITH THE NEW SONG. IF NEXTtRY MADE IT TO 20 THEN WE WILL ASSUME THE 30
              // CURRENT SONGS ARE PLAYED OFTEN ENOUGH TO NOT ADD THE NEW SONG TO THE LIST
              if (nextTry < 20) {
                ref.child(lowestList[0].video_id).remove();
                ref.child(songId).update({
                  count: 1,
                  time_added: Date.now(),
                  title: title,
                  thumbnail: thumbnail,
                });
              }

              // ATTEMPT TO CLEAN UP SONGS THAT HAVE NOT BEEN ADDED WITHIN THE PAST WEEK
              // THIS WILL DECREMENT ANY 'OLD' SONGS' COUNTS SO THEY ARE MORE LIKELY
              // TO BE REMOVED FROM THE TOP LIST OVER TIME IF THEY ARE NO LONGER BEING NUM_PLAYED
              let curTime = Date.now();
              let decList = songs.filter(so => {
                return (so.time_added < (curTime - (7 * 24 * 60 * 60 * 1000)));
              });
              decList.forEach(dl => {
                dl.num_played = dl.num_played - 1;
                ref.child(decList.video_id + "/count").transaction(function(count) {
                  return count - 1;
                });
              });

              // REMOVE ANY SONGS FROM THE LIST IF THEIR COUNT IS LESS THAN 1
              let remList = songs.filter(s => {
                return (s.num_played < 1);
              });
              remList.forEach(rl => {
                ref.child(rl.video_id).remove();
                ref.child("num_songs").transaction(function(num_songs) {
                  return num_songs - 1;
                });
              });
            });
          }
        });
      }
    });
  }

  getTopSongs(userId) {
    return firebase.database().ref("/TopSongs/" + userId).once('value');
  }
}
