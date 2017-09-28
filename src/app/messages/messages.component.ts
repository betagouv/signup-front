import { Component, OnInit, Input } from '@angular/core';
import { Enrollment } from '../enrollment/enrollment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() enrollment: Enrollment;

  constructor() { }

  ngOnInit() {
  }

}
