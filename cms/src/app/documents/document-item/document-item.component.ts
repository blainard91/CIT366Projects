import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../contacts/contact.model";
import {Document} from "../../documents/document.model";

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  constructor() { }
  @Input() document: Document;

  ngOnInit() {
  }

}
