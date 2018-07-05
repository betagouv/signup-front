import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import ReactTable from 'react-table'
import _ from 'lodash'
import moment from 'moment'
import Services from '../lib/services'
import {getErrorMessage} from '../lib/utils'
import withUser from './hoc/with-user'
import SearchIcon from './icons/search'
import ScheduleIcons from './icons/schedule'
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
    }).catch(error => this.setState({errors: getErrorMessage(error)}))
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

  style = {
    table: {
      border: 'none'
    },
    thead: {
      boxShadow: 'none'
    },
    header: {
      padding: '1em',
      backgroundColor: '#ebeff3',
      fontWeight: 'bold',
      borderRight: 'none',
      outline: '0'
    },
    updateAtHeader: {
      padding: '0.7em 0'
    },
    footer: {

    },
    cell: {
      cursor: 'pointer',
      padding: '1em 0.5em',
      borderRight: 'none',
      overflow: 'hidden'
    },
    centeredCell: {
      textAlign: 'center'
    },
    actionCell: {
      cursor: 'inherit',
      padding: '0.5em',
      overflow: 'visible'
    },
    pagination: {
      boxShadow: 'none',
      borderTop: '1px solid rgba(0,0,0,0.1)'
    }
  }

  hasTriggerableActions = ({acl}) => (
    !_.isEmpty(_.pickBy(acl, (value, key) => value && this.aclToAction[key]))
  )

  columnConfiguration = [
    {
      // Remove arrow in sub components (see https://github.com/react-tools/react-table/issues/62#issuecomment-306061293)
      expander: true,
      show: false
    },
    {
      id: 'updated_at',
      accessor: ({updated_at, acl}) => ({updated_at, acl}),
      Header: () => <ScheduleIcons />,
      headerStyle: {...this.style.header, ...this.style.updateAtHeader},
      style: this.style.cell,
      width: 30,
      Cell: ({value: {updated_at: updatedAt, acl}}) => {
        if (!this.hasTriggerableActions({acl})) {
          return null
        }

        const daysFromToday = moment().diff(updatedAt, 'days')
        const color = daysFromToday > 5 ? 'red' : daysFromToday > 4 ? 'orange' : 'green'
        return <span style={{color}}>{daysFromToday}j</span>
      },
      sortMethod: (firstMember, secondMember) => {
        // Enrollment that have action triggerable by the user are shown first
        // Then we order by last update date in order to have:
        // 1. the oldest enrollment with triggerable action appears first
        // 2. the oldest enrollment without triggerable action appears last
        const firstMemberCanTriggerAction = this.hasTriggerableActions({acl: firstMember.acl})
        const secondMemberCanTriggerAction = this.hasTriggerableActions({acl: secondMember.acl})

        if (firstMemberCanTriggerAction && !secondMemberCanTriggerAction) {
          return -1
        }
        if (!firstMemberCanTriggerAction && secondMemberCanTriggerAction) {
          return 1
        }
        if (firstMember.updated_at > secondMember.updated_at) {
          return firstMemberCanTriggerAction && secondMemberCanTriggerAction ? 1 : -1
        }
        if (firstMember.updated_at < secondMember.updated_at) {
          return firstMemberCanTriggerAction && secondMemberCanTriggerAction ? -1 : 1
        }
        // Returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
        return 0
      }
    },
    {
      Header: 'Intitulé',
      accessor: 'demarche.intitule',
      headerStyle: this.style.header,
      style: this.style.cell
    }, {
      Header: 'Demandeur',
      accessor: 'applicant.email',
      headerStyle: this.style.header,
      style: this.style.cell
    }, {
      Header: 'Fournisseur',
      id: 'fournisseur_de_donnees',
      headerStyle: this.style.header,
      style: {...this.style.cell, ...this.style.centeredCell},
      width: 130,
      accessor: ({fournisseur_de_donnees}) => (FOURNISSEUR_DE_DONNEES_LABELS[fournisseur_de_donnees])
    }, {
      Header: 'Statut',
      id: 'status',
      headerStyle: this.style.header,
      style: {...this.style.cell, ...this.style.centeredCell},
      width: 100,
      accessor: ({state}) => (STATE_LABELS[state])
    }, {
      Header: 'Action',
      id: 'action',
      headerStyle: this.style.header,
      style: {...this.style.cell, ...this.style.actionCell},
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
      headerStyle: this.style.header,
      style: this.style.cell,
      width: 35,
      accessor: ({id, fournisseur_de_donnees}) => ({id, fournisseur_de_donnees}),
      Cell: () => <SearchIcon />
    }
  ]

  getTitle = ({column, rowInfo}) => {
    if (column.id === 'lien-demarche') {
      return 'Voir la démarche'
    }

    if (!rowInfo) {
      return null
    }

    if (column.id === 'updated_at') {
      return moment(rowInfo.row[column.id].updated_at).format('llll')
    }

    return rowInfo.row[column.id]
  }

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
          data={enrollments}
          columns={this.columnConfiguration}
          defaultSorted={[
            {
              id: 'updated_at'
            }
          ]}
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
            title: this.getTitle({column, rowInfo})
          })}
          getTheadProps={() => ({style: this.style.thead})}
          getPaginationProps={() => ({style: this.style.pagination})}
          style={this.style.table}
          className='-highlight'
          showPageSizeOptions={false}
          pageSize={pageSize}
          resizable={false}
          previousText='Précédent'
          nextText='Suivant'
          loadingText='Chargement...'
          noDataText='Aucun résultat'
          pageText='Page'
          ofText='sur'
          rowsText='lignes'
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
