import { User } from './user';
import { Song } from './song';

export class Hub {
  name: string;
  creator_name: string;
  creator_uid: string;
  pin: number;
  last_active: Date;
  hub_uid: string;
  users: User[];
  songs: Song[];
  constructor (
    name: string, creator_name: string, creator_uid: string, pin: number,
    last_active: Date, hub_uid: string, users: User[], songs: Song[]
  ) {
    this.name = name;
    this.creator_name = creator_name;
    this.creator_uid = creator_uid;
    this.pin = pin;
    this.last_active = last_active;
    this.hub_uid = hub_uid;
    this.users = users;
    this.songs = songs;
  }
}
