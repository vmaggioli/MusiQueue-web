import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class YoutubeService {

  constructor(private http: Http) {}

  search(query: string) {
    console.log("inSearch");
    return this.http
      .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}`+
          '&maxResults=8' +
          '&type=video' +
          '&key=AIzaSyDtCJTBSLt9M1Xi_EBr49Uk4W8q4HhFHPU')
      .map(response => response.json())
  }
}
