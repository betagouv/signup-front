import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {
  serviceProviders: any[];
  errors: any;
  keys: any = Object.keys;

  constructor(
    public user: UserService,
    public enrollment: EnrollmentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user.getServiceProviders().then((response) => {
      this.serviceProviders = response.data
    })
  }

  submit () {
    this.enrollment.save().then(() => {
      this.errors = null
      console.log(this.enrollment)
      this.router.navigate(['/enrollement'])
    }).catch((errors) => {
      this.errors = errors
    })
  }
}
