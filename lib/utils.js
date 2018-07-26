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

export function getQueryVariable(variable) {
  if (typeof window === 'undefined') {
    return null
  }

  const query = window.location.search.substring(1)
  const vars = query.split('&')

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1])
    }
  }
}

export function getErrorMessage(error) {
  if (error.response && error.response.status === 422) {
    return _(error.response.data).values().flatten().value()
  }

  console.error(error)
  return ['Une erreur est survenue, merci de réessayer ultérieurement.']
}

export default {
  extractTokenFromUrl,
  getErrorMessage,
  getQueryVariable
}
