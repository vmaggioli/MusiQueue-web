import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { YTSong } from '../objects/YTsong';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class YoutubeService {
  public songs: YTSong[] = [];
  constructor(private http: Http) {}

  search(query: string): YTSong[] {
    console.log("inSearch");
    this.http
      .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}`+
          '&maxResults=8' +
          '&type=video' +
          '&key=AIzaSyDtCJTBSLt9M1Xi_EBr49Uk4W8q4HhFHPU')
      .map(response => {
        var data = response.json();
        data.items.forEach(d => {
          this.songs.push(new YTSong(d.snippet.title, d.snippet.thumbnails.default.url, d.id.videoId));
        });
        return this.songs;
      }).subscribe(res => {
      });
    return this.songs;
  }
}
