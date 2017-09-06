import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment/enrollment.service';
@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  constructor(
    public enrollment: EnrollmentService
  ) { }

  ngOnInit() {
  }

}
