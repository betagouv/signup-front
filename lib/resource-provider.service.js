import {BACK_HOST} from '@env'
import axios from 'axios'

export default class ResourceProviderService {
  getAll() {
    return axios.get(BACK_HOST + '/api/resource_providers').then(response => response.data)
  }
}
