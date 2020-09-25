import { MessageInterface } from '../interfaces/message.interface';
import { User } from './user.model';

export class Message {
  id: number;
  orderId: number;
  from: User;
  to: string;
  status?: number;
  message: string;
  reference?: number;
  type: string;
  info?: number;
  time: number;

  constructor(message: MessageInterface) {
    this.id = message.id;
    this.orderId = message.order_id;
    this.from = new User({
      user_id: message.from_user_id,
      username: message.from_username,
      access_token: '',
      role: message.from_role,
    });
    this.to = message.to_chatroom;
    this.status = message.status ? message.status: null;
    this.message = message.message;
    this.reference = message.reference ? message.reference: null;
    this.type = message.message_type;
    this.info = message.message_info ? message.message_info: null;
    this.time = message.sent_on;
  }
}
