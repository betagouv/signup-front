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
  }

  ngOnInit() {
    this.user.getServiceProviders().then((response) => {
      this.serviceProviders = response.data
    })
  }

  submit () {
    this.enrollment.save().then(() => {
      this.errors = null
      console.log(this.enrollment)
      this.router.navigate(['/enrolement'])
    }).catch((errors) => {
      this.errors = errors
    })
  }
}
