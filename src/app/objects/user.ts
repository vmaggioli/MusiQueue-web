import { Hub } from './hub';

export class User {
  name: string;
  uid: string;
  active: boolean;
  kicked: boolean;
  email: boolean;
  last_active: Date;
  list_of_hubs: Hub[];
}
