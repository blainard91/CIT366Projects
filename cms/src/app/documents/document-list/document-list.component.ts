import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Contact} from "../../contacts/contact.model";
import {Document} from "../../documents/document.model";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 'CIT 260 - Object Oriented Programming', 'Learn Object Oriented Programming and the Java' +
      ' programming language by designing and creating a simple game',  'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html', null),
    new Document(2, 'CIT 366 - Full Web Stack Development', 'Learn how to develop modern web applications using the' +
      ' MEAN stack',  'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT%20366%20course%20description.pdf', null),
    new Document(3, 'CIT 425 - Data Warehousing', 'A continuation of CIT 320 and focuses on the development of data' +
      ' warehousing systems',  'http://emp.byui.edu/mclaughlinm/IS425/Winter2009/Syllabus_CIT425_Winter2009.htm', null),
    new Document(4, 'CIT 460 - Enterprise Development', 'To help you acquire the hard and soft skills required to' +
      ' create enterprise grade web applications and web services in the current work environment',  'https://barneyej.wordpress.com/syllabus/', null),
    new Document(5, 'CIT 495 - Senior Practicum', 'A capstone experience for the Computer Information Technology' +
      ' major.',  'hhttp://www.byui.edu/computer-information-technology/courses', null)
  ];
  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
