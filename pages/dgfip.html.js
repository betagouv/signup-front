import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import DgfipForm from '../components/dgfip-form'
import DgfipNav from '../components/dgfip-nav'
import EntrantsTechniquesForm from '../components/entrants-techniques-form'
import Services from '../lib/services'

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
    const {url} = this.props
    const tokenFc = url.query.token
    let token

    if (typeof localStorage !== 'undefined' && tokenFc) {
      localStorage.setItem('token-fc', tokenFc)
    }

    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
    }

    if (url.query.id) {
      Services.getUserEnrollment(url.query.id, token).then(enrollment => {
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
            <DgfipForm id={url.query.id} />
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
