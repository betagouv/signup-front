import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import EnrollmentTable from '../components/enrollment-table'
import Redirect from '../components/redirect'

class Index extends React.Component {
  render() {
    const {url} = this.props
    return (
      <div>
        <Redirect redirect pathName={url.pathname} />
        <Page requireUser>
          <section className='section-grey'>
            <div className='container'>
              <h1>Liste des demandes</h1>
              <EnrollmentTable />
            </div>
          </section>
        </Page>
      </div>
    )
  }
}

Index.propTypes = {
  url: PropTypes.object.isRequired
}

export default Index
