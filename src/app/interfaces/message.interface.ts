export interface MessageInterface {
  id: number;
  order_id: number;
  from_user_id: number;
  to_chatroom: string;
  status?: number;
  message: string;
  reference?: number;
  message_type: string;
  message_info?: number;
  from_role: string;
  from_username: string;
  sent_on: number;
}

export interface ChatHistory {
  success: boolean;
  page_no: number;
  total_messages: number;
  total_pages: number;
  messages_per_page: number;
  data: MessageInterface[];
}

export interface ChatHistoryRequest {
  order_id: number;
  chatroom: string;
  page_no: number;
  messages_per_page: number;
}

export interface SendMessageRequest {
  order_id: number;
  chatroom: string;
  message: string;
  // OPTIONAL PARAMS
  message_type?: string;
  message_info?: number;
  reference?: number;
}

export interface SendMessageResponse {
  success: boolean;
  message_id: number;
}
