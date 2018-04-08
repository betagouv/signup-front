import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import ContractualisationForm from '../components/contractualisation-form-fc'
import ContractualisationNav from '../components/contractualisation-nav'
import EntrantsTechniquesForm from '../components/entrants-techniques-form'
import {BACK_HOST} from '@env'

const axios = require('axios')

class ContractualisationFc extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollment: {
        acl: {}
      }
    }
  }

  componentDidMount() {
    const {url} = this.props
    const tokenFc = url.query.token
    let token

    if (typeof localStorage !== 'undefined' && tokenFc) {
      localStorage.setItem('token-fc', tokenFc)
    }

    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
    }

    axios.get(BACK_HOST + '/api/enrollments/' + url.query.id, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({enrollment: response.data})
    })
  }

  render() {
    const {url} = this.props
    const {enrollment} = this.state
    return (
      <Page>
        <div className='documentation'>
          <ContractualisationNav id={url.query.id} />
          <div className='main-pane'>
            <ContractualisationForm id={url.query.id} />
            { enrollment.acl.show_technical_inputs &&
              <EntrantsTechniquesForm id={url.query.id} />
            }
          </div>
        </div>
      </Page>
    )
  }
}

ContractualisationFc.propTypes = {
  url: PropTypes.object.isRequired
}

export default ContractualisationFc
