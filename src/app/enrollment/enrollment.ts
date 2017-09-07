import { ReflectiveInjector } from '@angular/core';
import { EnrollmentService } from '../enrollment/enrollment.service'

export class Enrollment {
  enrollmentService: EnrollmentService;

  serviceProvider: any;
  scopes: any = {
    numberOfTaxShares: false,
    taxAddress: false,
    nonWadgeIncome: false,
    familySituation: false,
    supportPayments: false,
    deficit: false,
    housingTax: false,
    totalGrossIncome: false,
    worldIncome: false
  }
  legalBasis: any = {
    comment: null,
    attachment: null
  }
  serviceDescription: any = {
    main: null,
    deploymentDate: null,
    seasonality: null,
    maxCharge: null
  }
  agreement: boolean;
  newRecord: boolean;

  constructor (params) {
    let injector = ReflectiveInjector.resolveAndCreate([EnrollmentService]);
    this.enrollmentService = injector.get(EnrollmentService);
    if (!params) return
    for (let field in params) {
      this[field] = params[field]
    }
  }

  save () {
    return this.enrollmentService.save(this)
  }
}
