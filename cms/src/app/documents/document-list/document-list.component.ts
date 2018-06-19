import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Document} from "../../documents/document.model";
import {DocumentService} from "../../documents/documents.service";
import {Params} from "@angular/router";
import {Message} from "../../messages/message.model";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      })
  }



}
