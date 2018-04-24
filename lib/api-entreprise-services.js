import {API_ENTREPRISE_HOST} from '@env'
import httpAdapter from 'axios/lib/adapters/http'

const axios = require('axios')

axios.defaults.adapter = httpAdapter

const ApiEntrepriseServices = {
  getScopes() {
    return axios.get(API_ENTREPRISE_HOST + '/api/admin/roles').then(response => response.data)
  }
}

export default ApiEntrepriseServices
