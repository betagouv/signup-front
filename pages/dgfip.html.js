import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import Form from '../components/form'
import DgfipNav from '../components/dgfip-nav'
import EntrantsTechniquesForm from '../components/entrants-techniques-form'
import Services from '../lib/services'
import {getQueryVariable} from '../lib/utils'
import DgfipFormConfiguration from '../components/data/dgfip.form'

class Dgfip extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollment: {
        acl: {}
      }
    }
  }

  componentDidMount() {
    let token

    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
    }

    const id = getQueryVariable('id')
    if (id) {
      Services.getUserEnrollment(id, token).then(enrollment => {
        this.setState({enrollment})
      })
    }
  }

  render() {
    const {url} = this.props
    const {enrollment} = this.state

    return (
      <Page>
        <div className='documentation'>
          <DgfipNav id={url.query.id} />
          <div className='main-pane'>
            <Form id={url.query.id} form={DgfipFormConfiguration} />
            { enrollment.acl.show_technical_inputs &&
              <EntrantsTechniquesForm id={url.query.id} />
            }
          </div>
        </div>
      </Page>
    )
  }
}

Dgfip.propTypes = {
  url: PropTypes.object.isRequired
}

export default Dgfip
