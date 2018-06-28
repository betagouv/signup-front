import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import ReactTable from 'react-table'
import _ from 'lodash'
import Services from '../lib/services'
import withUser from './hoc/with-user'
import SearchIcon from './icons/search'
import MultipleChoiceButton from './widgets/multiple-choice-button'

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

  aclToAction = {
    validate_application: {
      trigger: () => console.log('validate_application'),
      label: 'Valider'
    },
    review_application: {
      trigger: () => console.log('review_application'),
      label: 'À modifier'
    },
    refuse_application: {
      trigger: () => console.log('refuse_application'),
      label: 'Refuser'
    },
    send_application: {
      trigger: () => console.log('send_application'),
      label: 'Envoyer'
    },
    deploy_application: {
      trigger: () => console.log('deploy_application'),
      label: 'Déployer'
    },
    send_technical_inputs: {
      trigger: () => console.log('deploy_application'),
      label: 'Mettre en production'
    }
  }

  tableHeaders = [
    {
      Header: 'Intitulé de la démarche',
      accessor: 'demarche.intitule'
    }, {
      Header: 'Demandeur',
      accessor: 'applicant.email'
    }, {
      Header: 'Fournisseur de données',
      accessor: 'human_fournisseur_de_donnees'
    }, {
      Header: 'Statut',
      accessor: 'human_state'
    }, {
      Header: 'Action',
      id: 'action',
      accessor: 'acl',
      width: 170,
      Cell: ({value: acls}) => (
        <MultipleChoiceButton actions={
          _(acls)
            // {'send_application': true, 'deploy_application': false, 'create': true}
            .pickBy((value, key) => value && this.aclToAction[key])
            // {'send_application': true}
            .keys()
            // ['send_application']
            .map(acl => ({id: acl, ...this.aclToAction[acl]}))
            // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
            .value()
        } />
      )
    }, {
      Header: '',
      id: 'lienDemarche',
      accessor: ({id, fournisseur_de_donnees}) => ({id, fournisseur_de_donnees}),
      Cell: ({value: {id, fournisseur_de_donnees}}) => (
        <Link href={{pathname: `/${fournisseur_de_donnees}.html`, query: {id}}}>
          <a>
            <SearchIcon title='Voir la démarche' />
          </a>
        </Link>
      ),
      width: 46
    }
  ]

  render() {
    const {enrollments} = this.state

    const pageSize = 10

    return (
      <div className='enrollment-table'>
        <Head>
          <link rel='stylesheet' href='https://unpkg.com/react-table@latest/react-table.css' />
        </Head>
        <ReactTable
          className='-highlight'
          data={enrollments}
          columns={this.tableHeaders}
          getTdProps={(state, rowInfo, column) => ({
            onClick: (e, handleOriginal) => {
              if (rowInfo && column.id !== 'action') {
                const {original: {id, fournisseur_de_donnees}} = rowInfo
                Router.push({pathname: `/${fournisseur_de_donnees}.html`, query: {id}})
              }

              if (handleOriginal) {
                handleOriginal()
              }
            },
            style: {
              cursor: column.id === 'action' ? 'inherit' : 'pointer',
              padding: column.id === 'action' ? '0.5em' : '1em',
              borderRight: 'none',
              overflow: column.id === 'action' ? 'visible' : 'hidden'
            }
          })}
          getTheadProps={() => ({
            style: {
              boxShadow: 'none'
            }
          })}
          getPaginationProps={() => ({
            style: {
              boxShadow: 'none',
              borderTop: '1px solid rgba(0,0,0,0.1)'
            }
          })}
          getTheadThProps={() => ({
            style: {
              padding: '1em ',
              backgroundColor: '#ebeff3',
              fontWeight: 'bold',
              borderRight: 'none'
            }
          })}
          showPageSizeOptions={false}
          pageSize={pageSize}
          previousText='Précédent'
          nextText='Suivant'
          loadingText='Chargement...'
          noDataText='Aucun résultat'
          pageText='Page'
          ofText='sur'
          rowsText='lignes'
          style={{
            border: 'none'
          }}
        />
      </div>
    )
  }
}

export default withUser(EnrollmentTable)
