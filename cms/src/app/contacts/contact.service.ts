import {EventEmitter, Injectable, Output} from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS} from "./MOCKCONTACTS";
import {Document} from "../documents/document.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
  @Output() contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  currentContact: Contact;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.currentContact = this.contacts[18];
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts){
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
