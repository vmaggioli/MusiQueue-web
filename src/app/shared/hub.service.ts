import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Hub } from '../objects/hub';
import { AuthService } from './auth.service';

@Injectable()
export class HubService {

  public currentHub: Hub;
  constructor(public db: AngularFireDatabase,
              private auth: AuthService) { }

  createHub(closed: string, creator: string, last_active: string, latitude: string, longitude: string, name: string, pin: string, users: string, wifi: string){
    var date = Date.now();
    var hubRef = firebase.database().ref('Hubs/');
    console.log("current hub is : " + this.currentHub.name);
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

}
