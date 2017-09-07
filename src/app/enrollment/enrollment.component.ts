import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { Enrollment } from '../enrollment/enrollment';
import { slideInOutAnimation } from '../animations/main';
import { ActivatedRoute } from '@angular/router';

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
    public enrollmentService: EnrollmentService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.enrollmentService.get(params['id']).then((enrollment) => {
          this.enrollment = enrollment
        })
      } else {
        this.enrollment = enrollmentService.enrollment
      }
    })
  }

  ngOnInit() {
  }

}
