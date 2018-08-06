import _ from 'lodash'

export function extractTokenFromUrl(url) {
  const hash = url.split('#')[1]
  if (!hash) {
    return ''
  }
  const arrayHash = hash.split('&').map(e => e.split('='))
  const token = arrayHash.filter(e => e[0].match(/access_token/))[0]
  if (token) {
    return token[1]
  }
  return ''
}

export function getErrorMessage(error) {
  if (error.response && error.response.status === 422) {
    return _(error.response.data).values().flatten().value()
  }

  if (error.response && error.response.data) {
    return _(error.response.data).values().flatten().value()
  }

  console.error(error)
  return ['Une erreur est survenue, merci de réessayer ultérieurement.']
}
