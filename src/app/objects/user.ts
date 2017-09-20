import { Hub } from './hub';

export interface User {
  name: string;
  uid: string;
  active: boolean;
  kicked: boolean;
  email: boolean;
  last_active: Date;
  hubs_list: Hub[];
}
