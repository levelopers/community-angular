export class UserModel {
  id: number;
  username: string;
  avatarUrl: string;
  password: string;

  constructor(username: string = "", avatarUrl: string = "", password: string = "") {
    this.username = username;
    this.avatarUrl = avatarUrl;
    this.password = password;
  }
}
