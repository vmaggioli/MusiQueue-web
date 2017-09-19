import { Vote } from './vote';

export class Song {
  name: string;
  user_uid: string;
  user_name: string;
  up_votes: number;
  down_votes: number;
  time_added: Date;
  is_first: boolean;
  youtube_info: string;
  votes: Vote[];
}
