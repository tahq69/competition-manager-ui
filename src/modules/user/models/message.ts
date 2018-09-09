import { Entity } from "@/helpers/entity";

export enum MessageType {
  UserMessage = "USER_MESSAGE",
  TeamInvitation = "TEAM_MEMBER_INVITATION",
  TeamMemberInvitation = "TEAM_MEMBER_INVITATION"
}

export class Message extends Entity {
  public subject: string = "";
  public body: string = "";
  public is_read: boolean = false;
  public importance_level: number = 10;
  public type: MessageType = MessageType.UserMessage;
  public from_name: string = "";
  public to_id: number = 0;
  public to_name: string = "";
  public date_from_now: string = "";
  public reply: number = 0;
  public reply_count: number = 0;

  public payload?: any;
  public reply_on?: Message;

  constructor(data: any) {
    super(data);
    this.updateProps(data);
  }

  public updateProps(data: any) {
    this.subject = data.subject;
    this.body = data.body;
    this.is_read = data.is_read;
    this.importance_level = data.importance_level;
    this.type = data.type;
    this.from_name = data.from_name;
    this.to_id = data.to_id;
    this.to_name = data.to_name;
    this.date_from_now = data.date_from_now;
    this.reply = data.reply;
    this.reply_count = data.reply_count;
    this.payload = data.payload;

    if (data.reply_on) {
      this.reply_on = new Message(data.reply_on);
    }
  }
}
