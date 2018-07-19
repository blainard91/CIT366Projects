import {EventEmitter, Injectable, Output} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/internal/Subject";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Document} from "../documents/document.model";
import {forEach} from "@angular/router/src/utils/collection";
import {typeIsOrHasBaseType} from "tslint/lib/language/typeUtils";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  currentContact: '10';
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getContacts(): Contact[] {
    // if (this.contacts.length > 0) {
    //   return this.contacts.slice();
    // }

    this.http.get('https://bkacms-70a80.firebaseio.com/contacts.json').subscribe(
      (contacts: Contact[]) => {
        //console.log(typeof contacts);
        this.contacts = contacts;
        console.log(this.contacts);
        this.maxContactId = this.getMaxId();

        this.contactListChangedEvent.next(this.contacts.slice());
        (error: any) => {
          console.log(error);
        }
      })
    return this.contacts.slice();
  }

  getMaxId(): number {
    var maxId = 0;
    for (var i = 0; i < this.contacts.length; i++) {
      var currentId = Number(this.contacts[i]['id']);
      if (currentId < maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  storeContact() {
    const contactsString = JSON.stringify(this.contacts);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put("https://bkacms-70a80.firebaseio.com/contacts.json", contactsString, {headers: headers})
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });

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
    this.storeContact();
  }

}
