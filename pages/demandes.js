import React from 'react'
import Page from '../components/page'
import Services from '../lib/services'
import Enrollment from '../components/enrollment'

class Demandes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollments: []
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    Services.getUserEnrollments(token).then(enrollments => {
      this.setState({enrollments})
    })
  }

  render() {
    const {enrollments} = this.state
    let i = 0
    return (
      <Page requireUser enrollments>
        <section>
          <h2 className='hero__white-background'>Demandes d{'\''}accès</h2>
          <table>
            {enrollments &&
              enrollments.map(enrollment => {
                return <Enrollment key={'enrollment' + i++} enrollment={enrollment} />
              })
            }
          </table>
        </section>
      </Page>
    )
  }
}

export default Demandes
