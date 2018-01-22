import { User } from './user';
import { Song } from './song';

export class Hub {
  name: string;
  creator: string;
  creator_uid: string;
  pin: string;
  last_active: number;
  hub_uid: string;
  users: User[];
  songs: Song[];
  public constructor (
    name: string, creator: string, creator_uid: string, pin: string,
    last_active: number, users: User[], songs: Song[]
  ) {
    this.name = name;
    this.creator = creator;
    this.creator_uid = creator_uid;
    this.pin = pin;
    this.last_active = last_active;
    this.users = users;
    this.songs = songs;
  }
}
