import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Hub } from '../objects/hub';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Injectable()
export class HubService {

  public currentHub: Hub;
  private hubsBySearch: FirebaseListObservable<Hub[]>;
  constructor(public db: AngularFireDatabase,
              private auth: AuthService,
              public usersService: UsersService,
            ) { }

  createHub(closed: string, creator: string, last_active: string, latitude: string, longitude: string, name: string, pin: string, users: string, wifi: string){
    const date = Date.now();
    var hubRef = firebase.database().ref('Hubs/');
    hubRef.child(name).update({
      closed: closed,
      creator: this.usersService.currentUser.uid,
      creator_name: this.usersService.currentUser.username,
      last_active: date,
      latitude: latitude,
      longitude: longitude,
      name: name,
      pin: pin,
      users: this.usersService.currentUser.username,
    });
    this.listenForNameChange(name, this.usersService.currentUser);
  }

  listenForNameChange(hub, user) {
    firebase.database().ref("Users/" + user.uid + "/username").on('value', snap => {
      firebase.database().ref("Hubs/" + hub).update({
        creator_name: user.username
      });
    });
  }

  getAllHubs() {
    return firebase.database().ref("Hubs/").once('value');
  }

  getHubByNameOnce(name) {
    return firebase.database().ref("Hubs/" + name).once('value');
  }

  getHubByName(name): FirebaseObjectObservable<Hub> {
    return this.db.object("Hubs/" + name);
  }

  getCreator(hub) {
    return firebase.database().ref("Hubs/" + hub + "/creator").once('value');
  }

  getHubsBySearch(name): Hub[] {
    var hubsBySearch: Hub[] = [];
    this.db.list("Hubs").subscribe(searchHubs => {
      searchHubs.forEach(hub => {
        if (name.length <= hub.name.length) {
          if (name.toLowerCase() == hub.name.substring(0, name.length).toLowerCase()) {
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

  getHubUsersOnce(name) {
    return firebase.database().ref("Hubs/" + name + "/users").once('value');
  }

  getHubUsers(hubUID: string) {
    return this.db.list("Hubs/" + hubUID + "/users");
  }

  removeUser(name, user) {
    firebase.database().ref("Hubs/" + name + "/users/" + user.uid).remove();
    firebase.database().ref("Users/" + user.uid + "/hub_list/" + name).remove();
  }

  removeSong(name, song) {
    firebase.database().ref("Songs/" + name + song.video_id).remove();
    firebase.database().ref("Users/" + song.user_id + "/songs/" + name + song.video_id).remove();
  }

  getHubsByUser(user) {
    return firebase.database().ref("Users/" + user + "/hub_list").once('value');
  }

  getPic(hubId) {
    let ref = firebase.storage().ref().child('images/hubs/' + hubId);
    if (ref != null)
      return ref.getDownloadURL();
    return null;
  }

  updatePic(hub, pic) {
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('images/hubs/' + hub);
    imagesRef.putString(pic, 'base64');
  }

  updateProfile(hub, location) {
    firebase.database().ref("/Hubs/" + hub).update({
      name: hub,
      location: location
    });
  }

}
