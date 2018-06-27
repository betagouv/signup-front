import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import Form from '../components/form'
import DgfipNav from '../components/dgfip-nav'
import EntrantsTechniquesForm from '../components/entrants-techniques-form'
import Services from '../lib/services'
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

    console.log('Query variable %s not found', variable)
  }

  componentDidMount() {
    const tokenFc = this.getQueryVariable('token')
    let token

    if (typeof localStorage !== 'undefined' && tokenFc) {
      localStorage.setItem('token-fc', tokenFc)
    }

    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
    }

    const id = this.getQueryVariable('id')
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
