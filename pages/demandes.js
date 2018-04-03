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
        <section className='section-grey'>
          <div className='container'>
            <h1>Liste des demandes</h1>
            {enrollments &&
              <ul className='panel-list'>
                {
                  enrollments.map(enrollment => <Enrollment key={'enrollment' + i++} enrollment={enrollment} />)
                }
              </ul>
            }
            {!enrollments &&
              <p>Aucune demande</p>
            }
          </div>
        </section>
      </Page>
    )
  }
}

export default Demandes
