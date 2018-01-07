export class TopSong {
  video_id: string;
  time_added: number;
  num_played: number;
  title: string;
  thumbnail: string;

  public constructor(video_id, time_added, num_played, title, thumbnail) {
    this.video_id = video_id;
    this.time_added = time_added;
    this.num_played = num_played;
    this.title = title;
    this.thumbnail = thumbnail;
  }
}
