import {BACK_HOST} from '@env'
import ResourceProviderService from '../../lib/resource-provider.service'
import RESOURCE_PROVIDERS from '../../mock/data/resource-providers'

const nock = require('nock')

describe('ResourceProviderService', () => {
  describe('When the user is authorized', () => {
    const data = RESOURCE_PROVIDERS
    nock(BACK_HOST).get('/api/resource_providers')
      .reply(200, data, {'content-type': 'application/json'})

    it('should return a 200 code', () => {
      const serviceProvider = new ResourceProviderService()
      return serviceProvider.getAll().then(response => {
        expect(response).toEqual(data)
      })
    })
  })
})
