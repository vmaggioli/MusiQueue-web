import { Hub } from './hub';

export class User {
  public username: string;
  public uid: string;
  public active: boolean;
  public kicked: boolean;
  public email: string;
  public last_active: number;
  public location: string;
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
    this.hub_list = hub_list;
  }

}
