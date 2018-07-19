import {EventEmitter, Injectable, Output} from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from "./MOCKMESSAGES";
import {Document} from "../documents/document.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  @Output() messageSelectedEvent = new EventEmitter<Message>();
  @Output() messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    //this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    this.http.get('https://bkacms-70a80.firebaseio.com/messages.json').subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.next(this.messages.slice());
        (error: any) => {
          console.log(error);
        }
      })
    return this.messages.slice();
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put("https://bkacms-70a80.firebaseio.com/documents.json", messagesString, {headers: headers})
      .subscribe(() => {
        this.messageChangeEvent.next(this.messages.slice());
      });

  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();

  }

  getMaxId(): number {
    var maxId = 0;
    this.messages.forEach(function(document){
      var currentId = parseInt(document.id);
      if (currentId < maxId) {
        maxId = currentId;
      }
    })
    return maxId;
  }
}
