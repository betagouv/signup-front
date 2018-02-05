import { ApplicationRef, Component, OnInit, OnDestroy } from '@angular/core';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { Enrollment } from '../enrollment/enrollment';
import { slideInOutAnimation } from '../animations/main';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit, OnDestroy {
  keys: any = Object.keys;
  enrollment: Enrollment;
  interval: any;
  moment: any = moment;

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
    // this.interval = setInterval(() => this.enrollmentService.reloadMessages(this.enrollment), 5000)
  }

  ngOnDestroy () {
    // clearInterval(this.interval)
  }

  upload (event) {
    return this.enrollmentService.uploadDocument(this.enrollment, event.target).then((res) => {
      this.application.tick()
      return res
    })
  }
}
