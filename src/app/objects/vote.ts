export class Vote {
  public vote_status: string;
  public hub: string;
  public video_id: string;
  public constructor (vote_status: string, hub: string, video_id: string) {
    this.vote_status = vote_status;
    this.hub = hub; // to narrow votes being listened to
    this.video_id = video_id;
  }
}
