import React from 'react'
import Head from 'next/head'
import ReactTable from 'react-table'
import withUser from '../components/hoc/with-user'
import Services from '../lib/services'
import Enrollment from '../components/enrollment'
import Link from 'next/link'

const STATE_HUMAN_NAMES = {
  'pending': 'Demande en attente',
  'sent': 'Demande envoyée',
  'validated': 'Demande validée',
  'refused': 'Demande refusée',
  'technical_inputs': 'En attente de déploiement',
  'deployed': 'Déployé'
}

class EnrollmentTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: props.user,
      enrollments: []
    }
  }

  componentDidMount() {
    Services.getUserEnrollments().then((enrollments) => {
      this.setState({enrollments: enrollments.map((enrollment) => {
        enrollment.human_state = STATE_HUMAN_NAMES[enrollment.state]
        return enrollment
      })})
    })
  }

  trigger(action, enrollment) {
    return () => Services.triggerUserEnrollment(action, enrollment).then(response => {
      const enrollment = response.data
      if (enrollment) {
        enrollment.human_state = STATE_HUMAN_NAMES[enrollment.state]

        const enrollments = this.state.enrollments.map((e) => {
          if (enrollment.id == e.id) {
            return enrollment
          } else {
            return e
          }
        })
        this.setState({enrollments})
      }
    })
  }

  render() {
    const {enrollments} = this.state
    const columns = [
      {
        Header: 'Fournisseur de service',
        accessor: 'demarche.intitule'
      }, {
        Header: 'Statut',
        accessor: 'human_state'
      }
    ]
    return (
      <div className='enrollment-table'>
        <Head>
          <link rel="stylesheet" href="https://unpkg.com/react-table@latest/react-table.css" />
        </Head>
        <ReactTable
          data={enrollments}
          columns={columns}
          showPageSizeOptions={false}
          pageSize='10'
          previousText='Précédent'
          nextText='Suivant'
          loadingText='Chargement...'
          noDataText='Aucun résultat'
          pageText='Page'
          ofText='sur'
          rowsText='lignes'
          SubComponent={row => (
            <Enrollment enrollment={row.original} />
          )}
        />
      </div>
    )
  }
}

export default withUser(EnrollmentTable)
