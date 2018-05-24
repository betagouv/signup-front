import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import ApiEntrepriseForm from '../components/api-entreprise-form'
import ApiEntrepriseNav from '../components/api-entreprise-nav'
import Redirect from '../components/redirect'

class ApiEntreprise extends React.Component {
  render() {
    const {url} = this.props
    return (
      <div>
        <Redirect pathName={url.asPath} />
        <Page requireUser>
          <div className='documentation'>
            <ApiEntrepriseNav />
            <div className='main-pane'>
              <ApiEntrepriseForm id={url.query.id} />
            </div>
          </div>
        </Page>
      </div>
    )
  }
}

ApiEntreprise.propTypes = {
  url: PropTypes.string
}
ApiEntreprise.defaultProps = {
  url: ''
}

export default ApiEntreprise
