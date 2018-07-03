const Utils = {
  extractTokenFromUrl(url) {
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
  },

  getQueryVariable(variable) {
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
  },

  // TODO remove and replace by lodash utilities
  deepSetInState(name, value, stateCopy) {
    name.split('.').reduce((acc, element) => {
      if (acc[element] && typeof acc[element] === 'object') {
        return acc[element]
      }

      acc[element] = value
      return value
    }, stateCopy)
  }
}

export default Utils
