import { Component, OnInit } from '@angular/core';
import {Contact} from "../contacts/contact.model";
import {Document} from "../documents/document.model";

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedDocument: Document;

  constructor() { }

  ngOnInit() {
  }

}