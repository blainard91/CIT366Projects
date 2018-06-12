import {EventEmitter, Injectable, Output} from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS} from "./MOCKCONTACTS";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  @Output() contactSelectedEvent = new EventEmitter<Contact>();
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
}
