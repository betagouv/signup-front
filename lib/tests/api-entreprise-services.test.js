import getConfig from 'next/config'
import ApiEntrepriseServices from '../../lib/api-entreprise-services'
import API_ENTREPRISE_SCOPES from '../../mock/api-entreprise/get-scopes-response'

const {publicRuntimeConfig: {API_ENTREPRISE_HOST}} = getConfig()
const nock = require('nock')

describe('getScopes', () => {
  describe('When the user is authorized', () => {
    describe('getResourceProviderService', () => {
      describe('When the user is authorized', () => {
        nock(API_ENTREPRISE_HOST).get('/api/admin/roles')
          .reply(200, API_ENTREPRISE_SCOPES, {'content-type': 'application/json'})

        it('should return a 200 code', () => {
          return ApiEntrepriseServices.getScopes().then(response => {
            expect(response).toEqual(API_ENTREPRISE_SCOPES)
          })
        })
      })
    })
  })
})
