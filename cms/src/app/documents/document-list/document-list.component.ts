import { Component, OnInit, OnDestroy } from '@angular/core';
import {Document} from "../../documents/document.model";
import {DocumentService} from "../../documents/documents.service";
import {Params} from "@angular/router";
import {Message} from "../../messages/message.model";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
