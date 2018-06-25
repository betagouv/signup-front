import React from 'react'
import Head from 'next/head'
import ReactTable from 'react-table'
import withUser from '../components/hoc/with-user'
import Services from '../lib/services'
import Enrollment from '../components/enrollment'

const TABLE_HEADERS = [
  {
    Header: 'Fournisseur de service',
    accessor: 'demarche.intitule'
  }, {
    Header: 'Type de demande',
    accessor: 'human_fournisseur_de_donnees'
  }, {
    Header: 'Statut',
    accessor: 'human_state'
  }
]

class EnrollmentTable extends React.Component {
  constructor(props) {
    super(props)

    this.triggerAction = this.triggerAction.bind(this)
    this.state = {
      enrollments: []
    }
  }

  componentDidMount() {
    Services.getUserEnrollments().then(enrollments => {
      this.setState({enrollments: enrollments.map(enrollment => {
        return enrollment
      })})
    })
  }

  triggerAction = (enrollment, action) => {
    return Services.triggerUserEnrollment(action, enrollment).then(({data: updatedEnrollment}) => {
      const currentEnrollments = this.state.enrollments
      const updatedEnrollments = currentEnrollments.map(currentEnrollment => {
        if (updatedEnrollment.id === currentEnrollment.id) {
          return updatedEnrollment
        }
        return currentEnrollment
      })
      this.setState({enrollments: updatedEnrollments})
    })
  }

  render() {
    const {enrollments} = this.state

    const pageSize = 10

    return (
      <div className='enrollment-table'>
        <Head>
          <link rel='stylesheet' href='https://unpkg.com/react-table@latest/react-table.css' />
        </Head>
        <ReactTable
          data={enrollments}
          columns={TABLE_HEADERS}
          expanded={new Array(pageSize).fill(true)} // Expand all
          showPageSizeOptions={false}
          pageSize={pageSize}
          previousText='Précédent'
          nextText='Suivant'
          loadingText='Chargement...'
          noDataText='Aucun résultat'
          pageText='Page'
          ofText='sur'
          rowsText='lignes'
          SubComponent={row => (<Enrollment enrollment={row.original} triggerAction={this.triggerAction} />)}
        />
      </div>
    )
  }
}

export default withUser(EnrollmentTable)
