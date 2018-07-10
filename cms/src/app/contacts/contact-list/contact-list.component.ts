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
  private subscription: Subscription;

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.subscription = this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
