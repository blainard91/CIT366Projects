import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../contacts/contact.model";
import {Document} from "../../documents/document.model";

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document;

  constructor() { }

  ngOnInit() {
  }

}
