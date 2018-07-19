import {Component, OnDestroy, OnInit} from '@angular/core';
import { ContactService } from "../contact.service";
import { Contact } from '../contact.model';
import {Document} from "../../documents/document.model";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string = "";

  constructor(private contactService: ContactService) {

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }
}
