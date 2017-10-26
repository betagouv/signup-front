import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message/message';
import * as moment from 'moment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  moment: any = moment;

  constructor() { }

  ngOnInit() {
  }

}
