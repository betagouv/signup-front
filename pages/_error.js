import React from 'react'
import NextError from 'next/error'
import PropTypes from 'prop-types'

// We override the default next error to insert error for using IE
export default class Error extends React.Component {
  static getInitialProps({res, err}) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return {statusCode}
  }

  render() {
    if (this.props.statusCode) {
      return <NextError statusCode={this.props.statusCode} />
    }

    if (/Trident|MSIE/.test(navigator.userAgent)) {
      // Style was extracted from node_modules/next/dist/lib/error.js
      return (
        <div style={{background: '#FFF', height: '100vh', textAlign: 'center', color: '#000', fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div>
            <div style={{height: '49px', textAlign: 'left', lineHeight: '49px', verticalAlign: 'middle', display: 'inline-block'}}>
              <h2 style={{margin: '0px', padding: '0px', lineHeight: 'inherit', fontSize: '14px', fontWeight: 'normal'}}>
                Internet explorer n&apos;est pas supporté. Veuillez utiliser <a href='https://www.mozilla.org/fr/firefox/'>Firefox</a> ou <a href='https://www.google.com/chrome/'>Google Chrome</a>.
              </h2>
            </div>
          </div>
        </div>
      )
    }

    return (
      <NextError statusCode={this.props.statusCode} />
    )
  }
}

Error.propTypes = {
  statusCode: PropTypes.number
}

Error.defaultProps = {
  statusCode: null
}
