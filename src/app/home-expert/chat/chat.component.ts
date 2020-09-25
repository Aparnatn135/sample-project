import { Component, OnInit, Input, OnDestroy, Inject } from "@angular/core";
import { map, switchMap, retry, share, takeUntil } from "rxjs/operators";
import { Observable, timer, Subject } from "rxjs";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";

import { ChatService } from "../../service/chat.service";
import { User } from "../../models/user.model";
import { Message } from "../../models/message.model";

const MESSAGE_PER_PAGE = 10;
const MESSAGE_TYPE = "TEXT";

@Component({
  selector: "chat-root",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit, OnDestroy {
  /**
   * pass this from order details page
   */
  @Input()
  orderId: number = 19;

  /**
   * Chatroom
   * TODO : make it dynamic but how
   */
  @Input()
  chatroom: string = "tx";

  /**
   * To show the other users name with whom we are chatting
   * TODO : make it dynamic but how
   */
  selectedConversation = {
    display_name: "Student",
    members: [],
  };

  /**
   * Current legginged user to get user id name ..
   */
  user: User;

  /**
   * temporarily store typed message
   */
  text: string;

  /**
   * To kep recent chat history
   */
  chats: Message[] = [];

  /**
   * Subject to cancel subscriptions when component is destroyed
   * @see ngOnDestroy
   */
  private destroyed$ = new Subject<void>();

  /**
   * Only if text box have some value allow to send message
   */
  get allowPost() {
    return this.text && this.text.trim().length > 0;
  }

  constructor(
    private chatService: ChatService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  ngOnInit() {
    this.setUer();
    this.pollChat();
  }

  /**
   * Set current user details
   */
  setUer() {
    this.user = new User({
      user_id: this.storage.get("user_id"),
      name: "Expert", // TODO  : make it dynamic
      role: "ex",
    });
  }

  /**
   * Constantly poll for ne chat messages
   * TODO : use socket for better performance
   */
  pollChat() {
    timer(1, 3000)
      .pipe(
        switchMap(() => this.loadChatHistory()),
        retry(),
        share(),
        takeUntil(this.destroyed$)
      )
      .subscribe((messages: Message[]) =>
        messages.forEach((message) => this.pushNewChatToChatWindow(message))
      );
  }

  private pushNewChatToChatWindow(message: Message) {
    if (this.canWeAddToChatHistory(message)) {
      this.chats.push(message);
    }
  }

  private canWeAddToChatHistory(message: Message): boolean {
    return !this.chats.some((chat) => chat.id === message.id);
  }

  private loadChatHistory(page = 1): Observable<Message[]> {
    return this.chatService
      .getChatHistory({
        order_id: this.orderId,
        chatroom: this.chatroom,
        page_no: page,
        messages_per_page: MESSAGE_PER_PAGE,
      })
      .pipe(
        map((response) => {
          if (response.data) {
            response.data.reverse();
            return response.data.map((chat) => new Message(chat));
          }

          return [];
        })
      );
  }

  /**
   * To send new messages and push it to chat history on success
   * @param text
   */
  sendText(text: string) {
    const observer = this.chatService
      .sendMessage({
        order_id: this.orderId,
        chatroom: this.chatroom,
        message_type: MESSAGE_TYPE,
        message: text,
      })
      .subscribe((response) => {
        this.pushNewChatToChatWindow(
          new Message({
            from_role: this.user.role,
            from_user_id: this.user.id,
            from_username: this.user.username,
            id: response.message_id,
            message: text,
            message_type: MESSAGE_TYPE,
            order_id: this.orderId,
            sent_on: Math.floor(Date.now() / 1000),
            to_chatroom: "tx",
          })
        );
        this.text = "";
        observer.unsubscribe();
      });
  }

  /**
   * Completes the {@link destroyed$} subject to cancel all subscriptions that are aware of it
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
