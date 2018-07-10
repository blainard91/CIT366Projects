import { Component, OnInit } from '@angular/core';
import {ContactService} from "../contact.service";
import {Contact} from "../contact.model";
import {MOCKCONTACTS} from "../MOCKCONTACTS";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Document} from "../../documents/document.model";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contacts: Contact[] = [];
  id: string;
  maxContactId: number;
  editMode: boolean = false;
  originalContact: Contact;
  contact: Contact;
  invalidGroupContact = false;
  groupContacts: Contact[] = [];

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {
    this.maxContactId = this.getMaxId();
    this.contacts = MOCKCONTACTS;
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(this.id);

        if (!this.originalContact) {
          return;
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.originalContact.group !== null) {
          this.contact.group = this.originalContact.group.slice();
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const id = this.getMaxId();

    const newContact = new Contact("", values.name, values.email, values.phone, values.imageUrl, null);

    if (this.editMode === true) {
      this.updateContact(this.originalContact, newContact)
    } else {
      this.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }



    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
      return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if(idx < 0 || idx >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

  getMaxId(): number {
    var maxId = 0;
    this.contacts.forEach(function(contact){
      var currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    })
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return null;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    var contactsListClone = this.contacts.slice();
    this.contactService.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    var pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    var contactsListClone = this.contacts.slice();
    this.contactService.contactListChangedEvent.next(contactsListClone);
  }

}
