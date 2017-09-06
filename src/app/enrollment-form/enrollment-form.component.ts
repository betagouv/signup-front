import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {
  serviceProviders: any[];

  constructor(
    public user: UserService,
    public enrollment: EnrollmentService
  ) { }

  ngOnInit() {
    this.user.getServiceProviders().then((response) => {
      this.serviceProviders = response.data
    })
  }
}
