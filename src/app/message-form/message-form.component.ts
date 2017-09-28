import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message';
import { Enrollment } from '../enrollment/enrollment';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  @Input() enrollment: Enrollment;
  message: Message;

  constructor(
    private messageService: MessageService,
    private enrollmentService: EnrollmentService
  ) {
    this.message = new Message()
  }

  ngOnInit() {
  }

  send () {
    this.message.enrollment = this.enrollment
    this.messageService.save(this.message).then((response) => {
      this.enrollmentService.reload(this.enrollment)
      this.message = new Message()
    })
  }
}
