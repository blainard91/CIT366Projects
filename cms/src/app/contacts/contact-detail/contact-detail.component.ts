import { Component, OnInit, Input } from '@angular/core';

import { Contact } from '../contact.model';
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Document} from "../../documents/document.model";
import {MOCKCONTACTS} from "../MOCKCONTACTS";

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  contacts: Contact[] = [];
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {
    this.contacts = MOCKCONTACTS;
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    )
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contact']);

  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    var pos = this.contacts.indexOf(contact);
    if (pos < 0){
      return;
    }

    this.contacts = this.contacts.splice(pos, 1);
    var contactsListClone = this.contacts.slice();
    this.contactService.contactListChangedEvent.next(contactsListClone);
  }

}
