import { Injectable } from '@angular/core'
import { Enrollment } from '../enrollment/enrollment'

Injectable()
export class UserService {
  user: string;
  password: string;
  token: string;
  loggedIn: boolean;

  constructor () {}

  login () {
    if (this.user == 'octo' && this.password == 'octo') {
      this.loggedIn = true
      return Promise.resolve({
        access_token: '12345'
      }).then((response) => {
        this.token = response.access_token
        return response
      })
    } else {
      return Promise.reject({
        errors: [
          {
            detail: 'utilisateur et/ou mot de passe incorrect'
          }
        ]
      })
    }
  }

  isLoggedIn() {
    return this.loggedIn
  }
  logout () {
    return !(this.loggedIn = false)
  }

  getServiceProviders () {
    return Promise.resolve({
      data: [
        { name: 'service 1' },
        { name: 'service 2' }
      ]
    })
  }

  getToken () {
    return this.token
  }

  getEnrollments () {
    return Promise.resolve({
      data: [
        {
          serviceProvider: {
            name: 'service 1 from userService.getEnrollments'
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
          agreement: true
        }, {
          serviceProvider: {
            name: 'service 2 from userService.getEnrollments'
          },
          scopes: {
            numberOfTaxShares: true,
            taxAddress: true,
            nonWadgeIncome: false,
            familySituation: true,
            supportPayments: false,
            deficit: false,
            housingTax: true,
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
          agreement: true
        }
      ]
    }).then((response) => {
      return response.data.map((data) => {
        return new Enrollment(data)
      })
    })
  }
}
