import { Input, Component, OnInit } from '@angular/core';
import { Enrollment } from '../enrollment/enrollment';

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.css']
})
export class EnrollmentsTableComponent implements OnInit {

  @Input() enrollments: Enrollment[];

  constructor() { }

  ngOnInit() {
  }

}
