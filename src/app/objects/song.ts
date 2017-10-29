import { Vote } from './vote';

export class Song {
  down_votes: number;
  hub_id: string;
  playing: boolean;
  rank: number;
  song_name: string;
  thumbnail: string;
  time_added: Date;
  up_votes: number;
  user_id: string;
  username: string;
  video_id: string;
  public constructor(
    down_votes: number, hub_id: string, playing: boolean, rank: number, song_name: string,
    thumbnail: string, time_added: Date, up_votes: number, user_id: string, username: string, video_id: string
  ) {
    this.down_votes = down_votes;
    this.hub_id = hub_id;
    this.playing = playing;
    this.rank = rank;
    this.song_name = song_name;
    this.thumbnail = thumbnail;
    this.time_added = time_added;
    this.up_votes = up_votes;
    this.user_id = user_id;
    this.username = username;
    this.video_id = video_id;
  }
}
