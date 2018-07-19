import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Message} from "../message.model";
import {MessageService} from "../messages.service";
import {ContactService} from "../../contacts/contact.service";


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;

  constructor(private messageService: MessageService, private contactService: ContactService) {

  }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const currentSender = '10';
    const newMessage = new Message("1", subject, msgText, currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

}
