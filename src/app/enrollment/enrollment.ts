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
  states: string[] = [
    'completedApplication',
    'voucher',
    'approval',
    'signedAgreement',
    'applicationApproval',
    'deployed'
  ]
  state: string;
  newRecord: boolean;

  constructor (params) {
    let injector = ReflectiveInjector.resolveAndCreate([EnrollmentService]);
    this.enrollmentService = injector.get(EnrollmentService);
    if (!params) return
    for (let field in params) {
      this[field] = params[field]
    }
  }

  isStateCompleted(state) {
    return this.states.indexOf(state) <= this.states.indexOf(this.state)
  }

  save () {
    return this.enrollmentService.save(this)
  }
}
