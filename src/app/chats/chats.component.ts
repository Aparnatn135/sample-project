import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  
})
export class ChatsComponent implements OnInit {
  //messages = ["Hi how are you","I am fine"];
  messages = [{
    "text":"Hi How are you?",
    "self":false
  },{
    "text":"I am fine",
    "self":true
  }]
  replyMessage = "";
  constructor() { }

  ngOnInit() {
  }

  reply(){
    this.messages.push({
      "text":this.replyMessage,
      "self":true
    })
    
    return this.replyMessage = "https://aimseduonline.com/api/v1/send_message/test/";
  }

  
}