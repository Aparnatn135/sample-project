import { UserInterface } from '../interfaces/user.interface';

export class User {
  id: number;
  username?: string;
  name?: string;
  accessToken?: string;
  role: string;

  constructor(login: UserInterface) {
    this.id = login.user_id;
    this.name = login.name ? login.name : null;
    this.username = login.username ? login.username : null;
    this.accessToken = login.access_token ? login.access_token : null;
    this.role = login.role;
  }
}
