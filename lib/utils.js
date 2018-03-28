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
  deepSetInState(name, value, stateCopy) {
    console.log('name', name)
    name.split('.').reduce((acc, element) => {
      if (typeof acc[element] === 'object') {
        return acc[element]
      }
      acc[element] = value
      return value
    }, stateCopy)
  }
}

export default Utils
