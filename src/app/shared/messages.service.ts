import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Message } from '../objects/message';
import * as firebase from 'firebase/app';

@Injectable()
export class MessagesService {

  constructor(public db: AngularFireDatabase,) { }

  addMessage(hubId, userId, username, message) {
    let time = Date.now();
    firebase.database().ref("Messages/" + hubId + "/" + userId + time).update({
      userId: userId,
      username: username,
      time: time,
      message: message,
    });
  }

  getMessages(hubId) {
    return this.db.list("Messages/" + hubId);
  }

  cleanMessages(hubId) {
    const time = Date.now();
    firebase.database().ref("Messages/" + hubId).once('value', snap => {
      let messages: Message[];
      messages = [];
      // REMOVE ANY MESSAGES THAT ARE OLDER THAN A WEEK
      snap.forEach(s => {
        let maxTime = time - (7 * 24 * 60 * 60 * 1000);
        if (s.val().time < maxTime)
          this.removeMessage(hubId, s.val().userId + s.val().time);
        else
          messages.push(new Message(s.val().message, s.val().userId, s.val().username, s.val().time));
      });

      // LIMIT MESSAGE QUEUE TO 100 MESSAGES PER HUB
      messages.sort((a, b) => {
        if (a.time < b.time) return -1;
        else if (a.time > b.time) return 1;
        else return 0;
      });
      while (messages.length > 50) {
        let userId: string = messages[0].userId;
        let time: string = messages[0].time;
        let messageId: string = userId + time;
        this.removeMessage(hubId, messageId);
        messages.shift();
      }
    });
  }

  removeMessage(hubId, messageId) {
    firebase.database().ref("Messages/" + hubId + "/" + messageId).remove();
  }
}
