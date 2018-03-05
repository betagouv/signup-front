import OAuth from '../../lib/oauth'
require('./utils')
const Client = require('client-oauth2')
const nock = require('nock')

const module = new OAuth()
const config = require('../../lib/config')

describe('OAuth', () => {
  it('should instanciate an oauth client', () => {
    expect(module.client).toBeInstanceOf(Client)
  })
})
