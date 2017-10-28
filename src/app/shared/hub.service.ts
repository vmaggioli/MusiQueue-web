import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Hub } from '../objects/hub';
import { AuthService } from './auth.service';

@Injectable()
export class HubService {

  public currentHub: Hub;
  private hubsBySearch: FirebaseListObservable<Hub[]>;
  constructor(public db: AngularFireDatabase,
              private auth: AuthService) { }

  createHub(closed: string, creator: string, last_active: string, latitude: string, longitude: string, name: string, pin: string, users: string, wifi: string){
    var date = Date.now();
    var hubRef = firebase.database().ref('Hubs/');
    hubRef.child(name).set({
      closed: closed,
      creator: this.auth.getCurrentUser().displayName,
      last_active: date,
      latitude: latitude,
      longitude: longitude,
      name: name,
      pin: pin,
      users: this.auth.getCurrentUser().displayName,
      wifi: wifi
    });
  }

  getHubByName(name): FirebaseObjectObservable<Hub> {
    return this.db.object("Hubs/" + name);
  }

  getHubsBySearch(name): Hub[] {
    var hubsBySearch: Hub[] = [];
    this.db.list("Hubs").subscribe(searchHubs => {
      searchHubs.forEach(hub => {
        if (name.length <= hub.name.length) {
          if (name == hub.name.substring(0, name.length) {
            hubsBySearch.push(hub);
          }
        }
      });
    });
    return hubsBySearch;
  }

  getHubsByLat(lat): FirebaseListObservable<Hub[]> {
    var latMin: number = lat - 0.01;
    var latMax: number = lat + 0.01;
    return this.db.list("Hubs", {
      query: {
        orderByChild: 'latitude',
        startAt: latMin,
        endAt: latMax
      }
    });
  }

  getHubsByLong(long): FirebaseListObservable<Hub[]> {
    var longMin: number = long - 0.01;
    var longMax: number = long + 0.01;
    return this.db.list("Hubs", {
      query: {
        orderByChild: 'longitude',
        startAt: longMin,
        endAt: longMax
      }
    });
  }

  getHubUsers(hubUID: string) {
    return this.db.list("Hubs/" + hubUID + "/users");
  }

  removeUser(name, user) {
    // firebase.database().ref("Hubs/" + name + "/users/" + user.uid).remove();
    // firebase.database().ref("Users/" + user.uid + "/hub_list/" + name).remove();
  }

  removeSong(name, song) {
    firebase.database().ref("Songs/" + name + song.video_id).remove();
    firebase.database().ref("Users/" + song.user_id + "/songs/" + name + song.video_id).remove();
  }
}
