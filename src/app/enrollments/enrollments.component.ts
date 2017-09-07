import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Enrollment } from '../enrollment/enrollment';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {
  enrollments: Enrollment[];

  constructor(
    public user: UserService,
    private enrollmentService: EnrollmentService
  ) {
    user.getEnrollments().then((enrollments) => {
      this.enrollments = enrollments
    })
  }

  ngOnInit() {
  }

}
