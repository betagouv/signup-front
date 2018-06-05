import {API_ENTREPRISE_HOST} from '@env'
import httpAdapter from 'axios/lib/adapters/http'
import API_ENTREPRISE_SCOPES from '../mock/api-entreprise/get-scopes-response'

const axios = require('axios')

axios.defaults.adapter = httpAdapter

const ApiEntrepriseServices = {
  getScopes() {
    if (process.env.NODE_ENV === 'production') {
      return axios.get(API_ENTREPRISE_HOST + '/api/admin/roles').then(response => response.data)
    }

    return Promise.resolve(API_ENTREPRISE_SCOPES)
  }
}

export default ApiEntrepriseServices