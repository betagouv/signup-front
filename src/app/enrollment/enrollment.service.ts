import { Injectable } from '@angular/core';

@Injectable()
export class EnrollmentService {
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

  constructor () {}

  save () {
    let valid = true
    const errors = {}
    if (!this.agreement) {
      errors['agreement'] = "Vous devez accepter les conditions d'utilisation"
      valid = false
    }
    if (valid) {
      this.newRecord = true
      return Promise.resolve()
    } else {
      return Promise.reject(errors)
    }
  }
}
