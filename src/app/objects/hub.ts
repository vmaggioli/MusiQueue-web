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
}
