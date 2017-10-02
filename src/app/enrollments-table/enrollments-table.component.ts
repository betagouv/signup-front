import { Input, Component, OnInit } from '@angular/core';
import { Enrollment } from '../enrollment/enrollment';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.css']
})
export class EnrollmentsTableComponent implements OnInit {

  @Input() enrollments: Enrollment[];

  constructor(
    private enrollmentService: EnrollmentService
  ) { }

  ngOnInit() {
  }

}
