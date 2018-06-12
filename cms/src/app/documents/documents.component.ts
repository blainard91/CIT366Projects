import { Component, OnInit } from '@angular/core';
import {Document} from "../documents/document.model";
import {DocumentService} from "../documents/documents.service";
import {Contact} from "../contacts/contact.model";

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedDocument: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    );
  }

}
