import {EventEmitter, Injectable, Output} from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Subject} from "rxjs/internal/Subject";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {stringify} from "querystring";



@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  @Output() documentChangedEvent = new EventEmitter<Document[]>();
  @Output() documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get('https://bkacms-70a80.firebaseio.com/documents.json').subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort(function (a,b){
          const docA = a.name.toUpperCase();
          const docB = b.name.toUpperCase();
          if (docA < docB) {
            return -1;
          } else if (docA > docB) {
            return 1;
          } else {
            return 0;
          }
        })
        this.documentListChangedEvent.next(this.documents.slice());
        (error: any) => {
          console.log(error);
        }
      })
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

  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put("https://bkacms-70a80.firebaseio.com/documents.json", documentsString, {headers: headers})
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });

  }

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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    var pos = this.documents.indexOf(document);
    if (pos < 0){
      return;
    }

    this.documents.splice(pos, 1);
    var documentsListClone = this.documents.slice();
    this.storeDocuments();
  }
}
