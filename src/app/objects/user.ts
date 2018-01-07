import { Hub } from './hub';

export class User {
  public username: string;
  public uid: string;
  public active: boolean;
  public kicked: boolean;
  public email: string;
  public last_active: number;
  public location: string;
  public upvotes: number;
  public downvotes: number;
  public medal_count: number;
  public medal_score: number;
  public hub_list: Hub[];
  public constructor (
    username: string, uid :string, active: boolean, kicked: boolean,
    email: string, last_active: number, location: string, hub_list: Hub[]
  ) {
    this.username = username;
    this.uid = uid;
    this.active = active;
    this.kicked = kicked;
    this.email = email;
    this.last_active = last_active;
    this.location = location;
    this.upvotes = 0;
    this.downvotes = 0;
    this.medal_count = 0;
    this.medal_score = 0;
    this.hub_list = hub_list;
  }

}
