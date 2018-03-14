import React from 'react'
import Head from 'next/head'
import ReactTable from 'react-table'
import withUser from '../components/hoc/with-user'
import Services from '../lib/services'
import Enrollment from '../components/enrollment'

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
    console.log(enrollments)
    const columns = [
      {
        Header: 'Fournisseur de service',
        accessor: 'fournisseur_de_service'
      }, {
        Header: 'Statut',
        accessor: 'human_state'
      }, {
        Header: 'Actions',
        Cell: ({row}) => (
          <div>
            {row._original.acl.refuse_application &&
              <button type='submit' name='refuse_application' id='submit' onClick={this.trigger('refuse_application', row._original)}>
                Refuser
              </button>
            }
            {row._original.acl.review_application &&
              <button type='submit' name='review_application' id='submit' onClick={this.trigger('review_application', row._original)}>
                Demande de modifications
              </button>
            }
            {row._original.acl.validate_application &&
              <button type='submit' name='validate_application' id='submit' onClick={this.trigger('validate_application', row._original)}>
                Valider
              </button>
            }
            {row._original.acl.send_application &&
              <button type='submit' name='send_application' id='submit' onClick={this.trigger('send_application', row._original)}>
                Envoyer la demande
              </button>
            }
            {row._original.acl.deploy_application &&
              <button type='submit' name='deploy_application' id='submit' onClick={this.trigger('deploy_application', row._original)}>
                Déployer l'application
              </button>
            }
            {row._original.acl.send_technical_inputs &&
              <Link href={{pathname: '/' + row._original.fournisseur_donnees, query: {id: row._original.id}, hash: 'entrants-techniques'}}>
                <button type='submit' name='send_technical_inputs' id='submit'>
                Demander à entrer en production
                </button>
              </Link>
            }
          </div>
        )
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
