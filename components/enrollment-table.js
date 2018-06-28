import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import ReactTable from 'react-table'
import _ from 'lodash'
import Services from '../lib/services'
import withUser from './hoc/with-user'
import SearchIcon from './icons/search'
import MultipleChoiceButton from './widgets/multiple-choice-button'

const STATE_LABELS = {
  pending: 'À envoyer',
  sent: 'À valider',
  validated: 'Validée',
  refused: 'Refusée',
  technical_inputs: 'À déployer',
  deployed: 'Déployé'
}

const FOURNISSEUR_DE_DONNEES_LABELS = {
  'api-particulier': 'API Particulier',
  'api-entreprise': 'API Entreprise',
  dgfip: 'API Impôts particulier'
}

class EnrollmentTable extends React.Component {
  constructor(props) {
    super(props)

    this.triggerAction = this.triggerAction.bind(this)
    this.state = {
      enrollments: [],
      errors: []
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
    }).catch(error => {
      if (error.response.status === 422) {
        let errors = []
        let enrollmentError
        for (enrollmentError in error.response.data) {
          if (Object.prototype.hasOwnProperty.call(error.response.data, enrollmentError)) {
            errors = errors.concat(error.response.data[enrollmentError])
          }
        }
        this.setState({errors})
      } else {
        this.setState({errors: [`Une erreur est survenue ! ${JSON.stringify(error)}`]})
      }
    })
  }

  aclToAction = {
    validate_application: {
      getTrigger: enrollment => () => this.triggerAction(enrollment, 'validate_application'),
      label: 'Valider'
    },
    review_application: {
      getTrigger: enrollment => () => {
        const reason = window.prompt('Précisez au demandeur les modifications à apporter à sa demande :') // eslint-disable-line no-alert
        if (reason) {
          this.triggerAction({...enrollment, messages_attributes: [{content: reason}]}, 'review_application')
        }
      },
      label: 'À modifier'
    },
    refuse_application: {
      getTrigger: enrollment => () => this.triggerAction(enrollment, 'refuse_application'),
      label: 'Refuser'
    },
    send_application: {
      getTrigger: enrollment => () => this.triggerAction(enrollment, 'send_application'),
      label: 'Envoyer'
    },
    deploy_application: {
      getTrigger: enrollment => () => this.triggerAction(enrollment, 'deploy_application'),
      label: 'Déployer'
    },
    send_technical_inputs: {
      getTrigger: ({fournisseur_de_donnees: fournisseurDeDonnees, id}) => () =>
        Router.push({pathname: `/${fournisseurDeDonnees}.html`, query: {id}, hash: 'entrants-techniques'}),
      label: 'Mettre en production'
    }
  }

  tableHeaders = [
    {
      // See https://github.com/react-tools/react-table/issues/62#issuecomment-306061293
      expander: true,
      show: false
    },
    {
      accessor: 'updated_at',
      show: false
    },
    {
      Header: 'Intitulé',
      accessor: 'demarche.intitule'
    }, {
      Header: 'Demandeur',
      accessor: 'applicant.email'
    }, {
      Header: 'Fournisseur',
      id: 'fournisseur_de_donnees',
      width: 130,
      accessor: ({fournisseur_de_donnees}) => (FOURNISSEUR_DE_DONNEES_LABELS[fournisseur_de_donnees]),
      style: {textAlign: 'center'}
    }, {
      Header: 'Statut',
      id: 'status',
      width: 100,
      accessor: ({state}) => (STATE_LABELS[state]),
      style: {textAlign: 'center'}
    }, {
      Header: 'Action',
      id: 'action',
      width: 170,
      Cell: ({original: enrollment}) => (
        <MultipleChoiceButton actions={
          _(enrollment.acl)
            // {'send_application': true, 'deploy_application': false, 'create': true}
            .pickBy((value, key) => value && this.aclToAction[key])
            // {'send_application': true}
            .keys()
            // ['send_application']
            .map(acl => ({id: acl, label: this.aclToAction[acl].label, trigger: this.aclToAction[acl].getTrigger(enrollment)}))
            // [{id: 'send_application', trigger: ..., label: 'Envoyer'}]
            .value()
        } />
      )
    }, {
      Header: '',
      id: 'lien-demarche',
      accessor: ({id, fournisseur_de_donnees}) => ({id, fournisseur_de_donnees}),
      width: 35,
      Cell: () => <SearchIcon />
    }
  ]

  render() {
    const {enrollments, errors} = this.state

    const pageSize = 10

    return (
      <div className='enrollment-table'>
        {errors.map(error => <div key={error} className='notification error'>{error}</div>)}
        <Head>
          <link rel='stylesheet' href='https://unpkg.com/react-table@latest/react-table.css' />
        </Head>
        <ReactTable
          className='-highlight'
          data={enrollments}
          defaultSorted={[
            {
              id: 'updated_at',
              desc: true
            }
          ]}
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
              padding: column.id === 'action' ? '0.5em' : '1em 0.5em',
              borderRight: 'none',
              overflow: column.id === 'action' ? 'visible' : 'hidden'
            },
            title: column.id === 'lien-demarche' ? 'Voir la démarche' : rowInfo ? rowInfo.row[column.id] : null
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
              padding: '1em',
              backgroundColor: '#ebeff3',
              fontWeight: 'bold',
              borderRight: 'none',
              outline: '0'
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
          expanded={new Array(pageSize).fill(true)} // Expand all
          SubComponent={({original: {messages = []}}) => (
            messages.map(({content}) => <div key={content} className='notification warning'>{content}</div>)
          )}
        />
      </div>
    )
  }
}

export default withUser(EnrollmentTable)
