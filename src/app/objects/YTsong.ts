
export class YTSong {
  song_name: string;
  thumbnail: string;
  video_id: string;
  public constructor(song_name: string, thumbnail: string, video_id: string) {
    this.song_name = song_name;
    this.thumbnail = thumbnail;
    this.video_id = video_id
  }
}
