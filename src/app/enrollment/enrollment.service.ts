import { Injectable } from '@angular/core';
import { Enrollment } from '../enrollment/enrollment'

@Injectable()
export class EnrollmentService {
  enrollment: Enrollment;

  constructor () { }

  save (enrollment) {
    let valid = true
    const errors = {}
    if (!enrollment.agreement) {
      errors['agreement'] = "Vous devez accepter les conditions d'utilisation"
      valid = false
    }
    if (valid) {
      enrollment.newRecord = true
      return Promise.resolve()
    } else {
      return Promise.reject(errors)
    }
  }
}
