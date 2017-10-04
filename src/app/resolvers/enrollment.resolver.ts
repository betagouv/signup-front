import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { Enrollment } from '../enrollment/enrollment';

@Injectable()
export class EnrollmentResolver implements Resolve<Enrollment> {
  constructor (
    private enrollmentService: EnrollmentService
  ) {}

  resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
      return this.enrollmentService.get(route.params['id']).then((enrollment) => {
        return this.enrollmentService.enrollment = enrollment
      })
  }
}

