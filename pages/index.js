import React from 'react'
import Page from '../components/page'
import Services from '../lib/services'
import EnrollmentTable from '../components/enrollment-table'
import Redirect from '../components/redirect'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollments: []
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    Services.getUserEnrollments(token)
      .then(enrollments => {
        this.setState({enrollments})
      })
      .catch(error => {
        if (error.status === 401) {
          this.setState({})
        }
      })
  }

  render() {
    const {enrollments} = this.state
    const{url} = this.props
    let i = 0
    return (
      <div>
      <Redirect redirect pathName={url.pathname} />
      <Page requireUser enrollments>
        <section className='section-grey'>
          <div className='container'>
            <h1>Liste des demandes</h1>
            <EnrollmentTable>
            </EnrollmentTable>
          </div>
        </section>
      </Page>
      </div>
    )
  }
}

export default Index
