import React from 'react'
import Page from '../components/page'
import Services from '../lib/services'
import EntrantsTechniquesForm from '../components/entrants-techniques-form'

class EntrantsTechniques extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollment: {},
      id: props.url.query.id
    }
  }
  componentDidMount() {
    const {id} = this.state
    Services.getUserEnrollment(id).then((enrollment) => {
      this.setState({enrollment})
    })
  }
  render() {
    const {enrollment} = this.state
    return(
      <Page>
        <div className='documentation'>
        <EntrantsTechniquesForm enrollment={enrollment} />
        </div>
      </Page>
    )
  }
}

export default EntrantsTechniques
