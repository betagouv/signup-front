import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { Enrollment } from '../enrollment/enrollment'
import { slideInOutAnimation } from '../animations/main'

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  enrollment: Enrollment;

  constructor(
    public enrollmentService: EnrollmentService
  ) {
    this.enrollment = enrollmentService.enrollment
  }

  ngOnInit() {
  }

}
