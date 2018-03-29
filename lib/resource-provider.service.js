import {BACK_HOST} from '@env'
import axios from 'axios'

import httpAdapter from 'axios/lib/adapters/http'

axios.defaults.adapter = httpAdapter
// TO DO Résout l'erreur Network Error Jest

export default class ResourceProviderService {
  getAll() {
    return axios.get(BACK_HOST + '/api/resource_providers').then(response => response.data)
  }
}
