import { ReflectiveInjector } from '@angular/core';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { Message } from '../message/message'

function snakeCaseKeys (o) {
  if (!((typeof o) === 'object')) return o
  if (Array.isArray(o)) {
    return o.map((e) => snakeCaseKeys(e))
  }
  let res;
  for (let k in o) {
    res = res || {}
    if (!o[k]) {
      res[k.replace(/([A-Z])/g, (letter) => '_' + letter.toLowerCase())] = o[k]
      continue
    }
    let value = null;
    if (Object.keys(o[k]).length === 0 && o[k].constructor === Object) {
      value = {}
    } else {
      value = snakeCaseKeys(o[k])
    }
    res[k.replace(/([A-Z])/g, (letter) => '_' + letter.toLowerCase())] = value
  }
  return res
}

export class Enrollment {
  id: string;
  serviceProvider: any = {
    name: ''
  };
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
    seasonality: [],
    maxCharge: null
  }
  agreement: boolean;
  states: string[] = [
    'waiting_for_approval',
    'application_approved',
    'application_ready',
    'deployed'
  ]
  state: string;
  newRecord: boolean;
  documents: any[] = [];
  document_types: string[] = [
    'Document::CNILVoucher',
    'Document::CertificationResults',
    'Document::FranceConnectCompliance'
  ]
  applicant: any = {
    email: null,
    firstname: null,
    lastname: null,
    position: null,
    agreement: null
  }
  errors: any;
  messages: Message[] = [];
  acl: any = { }

  constructor (params) {
    if (!params) return
    for (let field in params) {
      this[field] = params[field]
    }
  }

  isStateCompleted(state) {
    return this.states.indexOf(state) <= this.states.indexOf(this.state)
  }

  serialized () {
    return snakeCaseKeys(this)
  }

  addSeasonalitySlot () {
    this.serviceDescription.seasonality = this.serviceDescription.seasonality || []
    this.serviceDescription.seasonality.push({})
  }

  cnilVoucher () {
    const res = this.documents.filter((e) => e.type == 'Document::CNILVoucher')[0]
    return res
  }
  certificationResults () {
    return this.documents.filter((e) => e.type == 'Document::CertificationResults')[0]
  }
  franceConnectCompliance () {
    return this.documents.filter((e) => e.type == 'Document::FranceConnectCompliance')[0]
  }
  conventionUrl () {
    return 'http://localhost:3000/api/enrollments/' +
      this.id +
      '/convention.pdf'
  }
}
