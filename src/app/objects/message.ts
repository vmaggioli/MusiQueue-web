export class Message {
  message: string;
  userId: string;
  username: string;
  time: number;
  public constructor(
    message, userId, username, time
  ) {
    this.message = message;
    this.userId = userId;
    this.username = username;
    if (time == 0)
      this.time = Date.now();
    else
      this.time = time;
  }
}
