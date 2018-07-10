import {EventEmitter, Injectable, Output} from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Subject} from "rxjs/internal/Subject";
import {forEach} from "@angular/router/src/utils/collection";
import {current} from "codelyzer/util/syntaxKind";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  @Output() documentChangedEvent = new EventEmitter<Document[]>();
  @Output() documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(index: string) {
    return this.documents[index];
  }

  /*deleteDocument (document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
*/
  getMaxId(): number {
    var maxId = 0;
    this.documents.forEach(function(document){
      var currentId = parseInt(document.id);
      if (currentId < maxId) {
        maxId = currentId;
      }
    })
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return null;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    var documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    var pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    var documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    var pos = this.documents.indexOf(document);
    if (pos < 0){
      return;
    }

    this.documents = this.documents.splice(pos, 1);
    var documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
