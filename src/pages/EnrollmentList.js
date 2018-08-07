import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { getUserEnrollments } from '../lib/services';
import ScheduleIcons from '../components/icons/schedule';
import { withUser } from '../components/UserContext';
import _ from 'lodash';
import moment from 'moment';

const STATE_LABELS = {
  pending: 'À envoyer',
  sent: 'À valider',
  validated: 'Validée',
  refused: 'Refusée',
  technical_inputs: 'À déployer',
  deployed: 'Déployé',
};

const FOURNISSEUR_DE_DONNEES_LABELS = {
  'api-particulier': 'API Particulier',
  dgfip: 'API Impôts particulier',
};

class EnrollmentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enrollments: [],
      errors: [],
    };
  }

  componentDidMount() {
    getUserEnrollments().then(enrollments => {
      this.setState({
        enrollments: enrollments.map(enrollment => {
          return enrollment;
        }),
      });
    });
  }

  style = {
    table: {
      border: 'none',
    },
    thead: {
      boxShadow: 'none',
    },
    header: {
      padding: '1em',
      backgroundColor: '#ebeff3',
      fontWeight: 'bold',
      borderRight: 'none',
      outline: '0',
    },
    updateAtHeader: {
      padding: '0.7em 0',
    },
    footer: {},
    cell: {
      cursor: 'pointer',
      padding: '1em 0.5em',
      borderRight: 'none',
      overflow: 'hidden',
    },
    centeredCell: {
      textAlign: 'center',
    },
    pagination: {
      boxShadow: 'none',
      borderTop: '1px solid rgba(0,0,0,0.1)',
    },
  };

  availableAction = new Set([
    'validate_application',
    'review_application',
    'refuse_application',
    'send_application',
    'deploy_application',
    'send_technical_inputs',
  ]);

  hasTriggerableActions = ({ acl }) =>
    !_.isEmpty(
      _.pickBy(acl, (value, key) => value && this.availableAction.has(key))
    );

  getColumnConfiguration = user => {
    const configuration = [
      {
        id: 'updated_at',
        accessor: ({ updated_at, acl }) => ({ updated_at, acl }),
        Header: () => <ScheduleIcons />,
        headerStyle: { ...this.style.header, ...this.style.updateAtHeader },
        style: this.style.cell,
        width: 30,
        Cell: ({ value: { updated_at: updatedAt, acl } }) => {
          if (!this.hasTriggerableActions({ acl })) {
            return null;
          }

          const daysFromToday = moment().diff(updatedAt, 'days');
          const color =
            daysFromToday > 5 ? 'red' : daysFromToday > 4 ? 'orange' : 'green';
          return <span style={{ color }}>{daysFromToday}j</span>;
        },
        sortMethod: (firstMember, secondMember) => {
          // Enrollment that have action triggerable by the user are shown first
          // Then we order by last update date in order to have:
          // 1. the oldest enrollment with triggerable action appears first
          // 2. the oldest enrollment without triggerable action appears last
          const firstMemberCanTriggerAction = this.hasTriggerableActions({
            acl: firstMember.acl,
          });
          const secondMemberCanTriggerAction = this.hasTriggerableActions({
            acl: secondMember.acl,
          });

          if (firstMemberCanTriggerAction && !secondMemberCanTriggerAction) {
            return -1;
          }
          if (!firstMemberCanTriggerAction && secondMemberCanTriggerAction) {
            return 1;
          }
          if (firstMember.updated_at > secondMember.updated_at) {
            return firstMemberCanTriggerAction && secondMemberCanTriggerAction
              ? 1
              : -1;
          }
          if (firstMember.updated_at < secondMember.updated_at) {
            return firstMemberCanTriggerAction && secondMemberCanTriggerAction
              ? -1
              : 1;
          }
          // Returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
          return 0;
        },
      },
      {
        Header: 'Intitulé',
        accessor: 'demarche.intitule',
        headerStyle: this.style.header,
        style: this.style.cell,
      },
      {
        Header: 'Demandeur',
        accessor: 'applicant.email',
        headerStyle: this.style.header,
        style: this.style.cell,
      },
      {
        Header: 'Fournisseur',
        id: 'fournisseur_de_donnees',
        headerStyle: this.style.header,
        style: { ...this.style.cell, ...this.style.centeredCell },
        width: 130,
        accessor: ({ fournisseur_de_donnees }) =>
          FOURNISSEUR_DE_DONNEES_LABELS[fournisseur_de_donnees],
      },
      {
        Header: 'Statut',
        id: 'status',
        headerStyle: this.style.header,
        style: { ...this.style.cell, ...this.style.centeredCell },
        width: 100,
        accessor: ({ state }) => STATE_LABELS[state],
      },
    ];

    if (user.account_type === 'dgfip') {
      configuration.push({
        Header: 'Fin homologation',
        accessor: 'date_fin_homologation',
        headerStyle: this.style.header,
        style: this.style.cell,
      });
    }

    return configuration;
  };

  getTitle = ({ column, rowInfo }) => {
    if (!rowInfo) {
      return null;
    }

    if (column.id === 'updated_at') {
      return moment(rowInfo.row[column.id].updated_at).format('llll');
    }

    return rowInfo.row[column.id];
  };

  render() {
    const { history, user } = this.props;
    const { enrollments, errors } = this.state;

    return (
      <section className="section-grey">
        <div className="container">
          <h2>Liste des demandes</h2>
          <div className="panel">
            <div className="enrollment-table">
              {errors.map(error => (
                <div key={error} className="notification error">
                  {error}
                </div>
              ))}
              <ReactTable
                data={enrollments}
                columns={this.getColumnConfiguration(user)}
                defaultSorted={[
                  {
                    id: 'updated_at',
                  },
                ]}
                getTdProps={(state, rowInfo, column) => ({
                  onClick: (e, handleOriginal) => {
                    if (rowInfo) {
                      const {
                        original: { id, fournisseur_de_donnees },
                      } = rowInfo;
                      history.push(`/${fournisseur_de_donnees}/${id}`);
                    }

                    if (handleOriginal) {
                      handleOriginal();
                    }
                  },
                  title: this.getTitle({ column, rowInfo }),
                })}
                getTheadProps={() => ({ style: this.style.thead })}
                getPaginationProps={() => ({ style: this.style.pagination })}
                style={this.style.table}
                className="-highlight"
                showPageSizeOptions={false}
                pageSize={10}
                resizable={false}
                previousText="Précédent"
                nextText="Suivant"
                loadingText="Chargement..."
                noDataText="Aucun résultat"
                pageText="Page"
                ofText="sur"
                rowsText="lignes"
              />
            </div>
            <p className="text-right">
              <Link to={'/api-particulier'}>
                <button className="button large" name="nouvelle-demande">
                  Nouvelle Demande
                </button>
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

EnrollmentList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  user: PropTypes.object,
};

EnrollmentList.defaultProps = {
  user: null,
};

export default withUser(EnrollmentList);
