import { Injectable } from "@angular/core";
import { HttpService } from "../core/service/http.service";
import {
  ChatHistory,
  ChatHistoryRequest,
  SendMessageRequest,
  SendMessageResponse,
} from "../interfaces/message.interface";
import { Observable } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ChatService extends HttpService {
  getChatHistory(request: ChatHistoryRequest): Observable<ChatHistory> {
    const payload = new HttpParams()
      .set("chatroom", request.chatroom)
      .set("messages_per_page", `${request.messages_per_page}`)
      .set("order_id", `${request.order_id}`)
      .set("page_no",  `${request.page_no}`);

    return this.posts(
      "/api/v1/show_messages/",
      payload,
      null
    );
  }

  sendMessage(request: SendMessageRequest): Observable<SendMessageResponse> {
    const payload = new HttpParams()
      .set("message", `${request.message}`)
      .set("order_id", `${request.order_id}`)
      .set("chatroom",  `${request.chatroom}`);
      // order_id: 19
      // chatroom: tx
      // message: This is test message
      // message_type: TEXT
      // message_info: -1
      // reference: -1
    return this.posts(
      "/api/v1/send_message/",
      payload,
      null
    );
  }

  approveMessage(request: { message_id: number }) {
    return this.posts(
      "/v1/approve_message/",
      request,
      new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
    );
  }

  // getApiUrl(action: string): string {
  //   return `${environment.apiUrl}${action}/`;
  // }

  // getChatHistory(request: ChatHistoryRequest): Observable<ChatHistory> {
  //   return this.http.post<ChatHistory>(
  //     HttpService.getFullUrl('show_messages'),
  //     request
  //   );
  // }

  // sendMessage(request: SendMessageRequest): Observable<SendMessageResponse> {
  //   return this.http.post<SendMessageResponse>(
  //     HttpService.getFullUrl('send_message'),
  //     request
  //   );
  // }

  // approveMessage(request: { message_id: number }) {
  //   return this.http.post<any>(HttpService.getFullUrl.getApiUrl('approve_message'), request);
  // }
}
