import OAuth from '../../lib/oauth'

const Client = require('client-oauth2')

const module = new OAuth()

describe('OAuth', () => {
  it('should instanciate an oauth client', () => {
    expect(module.client).toBeInstanceOf(Client)
  })
})
