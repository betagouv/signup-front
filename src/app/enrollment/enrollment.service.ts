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

  get (id) {
    return Promise.resolve({
      serviceProvider: {
        name: 'service 1 from enrollment.get'
      },
      scopes: {
        numberOfTaxShares: true,
        taxAddress: true,
        nonWadgeIncome: false,
        familySituation: true,
        supportPayments: false,
        deficit: true,
        housingTax: false,
        totalGrossIncome: false,
        worldIncome: false
      },
      legalBasis: {
        comment: 'test'
      },
      serviceDescription: {
        main: 'test',
        deploymentDate: 'test',
        seasonality: 'test',
        maxCharge: 'test'
      },
      state: 'approval',
      agreement: true
    }).then((data) => {
      return new Enrollment(data)
    })
  }
}
