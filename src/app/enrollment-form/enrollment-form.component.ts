import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { Enrollment } from '../enrollment/enrollment'
import { slideInOutAnimation } from '../animations/main'

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class EnrollmentFormComponent implements OnInit {
  serviceProviders: any[];
  enrollment: Enrollment;
  errors: any;
  keys: any = Object.keys;

  constructor(
    public user: UserService,
    public enrollmentService: EnrollmentService,
    private router: Router
  ) {
    enrollmentService.enrollment = enrollmentService.enrollment || new Enrollment({})
    this.enrollment = enrollmentService.enrollment
    enrollmentService.enrollment = null
  }

  ngOnInit() {
    this.user.getServiceProviders().then((response) => {
      this.serviceProviders = response.data
    })
  }

  submit () {
    this.enrollmentService.save(this.enrollment).then((response) => {
      this.errors = null
      this.router.navigate(['/enrolements/' + this.enrollment.id])
      this.enrollmentService.enrollment = new Enrollment({})
    }).catch((error) => {
      this.errors = error.error
    })
  }

  addSeasonalitySlot () {
    this.enrollment.addSeasonalitySlot()
  }
}
