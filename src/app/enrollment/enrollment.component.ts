import { ApplicationRef, Component, OnInit } from '@angular/core';
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
    private route: ActivatedRoute,
    private application: ApplicationRef
  ) {
    this.enrollment = new Enrollment({})
    this.route.params.subscribe((params) => {
      this.enrollmentService.get(params['id']).then((enrollment) => {
        this.enrollment = enrollment
      })
    })
  }

  ngOnInit() {
  }

  upload (event) {
    return this.enrollmentService.uploadDocument(this.enrollment, event.target).then((res) => {
      this.application.tick()
      return res
    })
  }
}
