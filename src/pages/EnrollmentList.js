import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import _ from 'lodash';
import moment from 'moment';

import {
  getUserArchivedEnrollments,
  getUserPendingEnrollments,
} from '../lib/services';
import ScheduleIcon from '../components/icons/schedule';
import { withUser } from '../components/UserContext';

const STATE_LABELS = {
  pending: 'Brouillon',
  sent: 'À valider',
  validated: 'Validée',
  refused: 'Refusée',
};

export const FOURNISSEUR_DE_DONNEES_LABELS = {
  'api-particulier': 'API Particulier',
  franceconnect: 'FranceConnect',
  'api-droits-cnam': 'API Droits CNAM',
  dgfip: 'API Impot particulier',
};

export const enrollmentListStyle = {
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

class EnrollmentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enrollments: [],
      errors: [],
      loading: true,
    };
  }

  async componentDidMount() {
    let enrollments = null;

    if (this.props.showArchived === true) {
      enrollments = await getUserArchivedEnrollments();
    } else {
      enrollments = await getUserPendingEnrollments();
    }

    this.setState({
      enrollments: enrollments.map(enrollment => {
        return enrollment;
      }),
      loading: false,
    });
  }

  availableAction = new Set([
    'validate_application',
    'review_application',
    'refuse_application',
    'send_application',
  ]);

  hasTriggerableActions = ({ acl }) =>
    !_.isEmpty(
      _.pickBy(acl, (value, key) => value && this.availableAction.has(key))
    );

  getColumnConfiguration = user => {
    const configuration = [
      {
        Header: () => <ScheduleIcon title="date de dernière mise à jour" />,
        accessor: 'updated_at',
        headerStyle: {
          ...enrollmentListStyle.header,
          ...enrollmentListStyle.updateAtHeader,
        },
        style: {
          ...enrollmentListStyle.cell,
          ...enrollmentListStyle.centeredCell,
        },
        width: 50,
        Cell: ({ value: updatedAt }) => {
          if (this.props.showArchived) {
            return <small>{moment(updatedAt).format('D/M')}</small>;
          }

          const daysFromToday = moment().diff(updatedAt, 'days');
          const color =
            daysFromToday > 5 ? 'red' : daysFromToday > 4 ? 'orange' : 'green';
          return <span style={{ color }}>{daysFromToday}j</span>;
        },
      },
      {
        Header: 'Intitulé',
        accessor: ({ demarche: { intitule }, id }) => ({ id, intitule }),
        id: 'intitule',
        headerStyle: enrollmentListStyle.header,
        style: enrollmentListStyle.cell,
        Cell: ({ value: { id, intitule } }) => `${id} - ${intitule}`,
        sortMethod: ({ id: firstMemberId }, { id: secondMemberId }) => {
          if (firstMemberId > secondMemberId) {
            return 1;
          }
          if (firstMemberId < secondMemberId) {
            return -1;
          }
          // Returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
          return 0;
        },
      },
      {
        Header: 'Demandeur',
        accessor: 'applicant.email',
        headerStyle: enrollmentListStyle.header,
        style: enrollmentListStyle.cell,
      },
      {
        Header: 'Fournisseur',
        accessor: ({ fournisseur_de_donnees }) =>
          FOURNISSEUR_DE_DONNEES_LABELS[fournisseur_de_donnees],
        id: 'fournisseur_de_donnees',
        headerStyle: enrollmentListStyle.header,
        style: {
          ...enrollmentListStyle.cell,
          ...enrollmentListStyle.centeredCell,
        },
        width: 130,
      },
      {
        Header: 'Statut',
        accessor: ({ state, acl }) => ({
          stateLabel: STATE_LABELS[state],
          acl,
        }),
        id: 'status',
        headerStyle: enrollmentListStyle.header,
        style: {
          ...enrollmentListStyle.cell,
          ...enrollmentListStyle.centeredCell,
        },
        width: 100,
        Cell: ({ value: { stateLabel, acl } }) => {
          if (!this.hasTriggerableActions({ acl })) {
            return stateLabel;
          }

          return <button className="button warning small">{stateLabel}</button>;
        },
        sortMethod: (firstMember, secondMember) => {
          if (firstMember.stateLabel > secondMember.stateLabel) {
            return 1;
          }
          if (firstMember.stateLabel < secondMember.stateLabel) {
            return -1;
          }
          // Returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
          return 0;
        },
      },
    ];

    if (user.account_type === 'dgfip') {
      // insert this column before the last one
      configuration.splice(configuration.length - 1, 0, {
        Header: 'Fin homologation',
        accessor: 'date_fin_homologation',
        headerStyle: enrollmentListStyle.header,
        style: enrollmentListStyle.cell,
      });
    }

    return configuration;
  };

  getTitle = ({ column, rowInfo }) => {
    if (!rowInfo) {
      return null;
    }

    // The idea here is to display content as tooltip in case the cell is not large enough to display its whole content
    const cellValue = rowInfo.row[column.id];

    if (column.id === 'status') {
      return cellValue.stateLabel;
    }

    if (column.id === 'updated_at') {
      return moment(cellValue).format('llll');
    }

    return cellValue;
  };

  render() {
    const { history, showArchived, user } = this.props;
    const { enrollments, errors, loading } = this.state;

    return (
      <section className="section-grey enrollment-page">
        <div className="container">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2>Liste des demandes</h2>
              <ul
                className="nav__links"
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  fill: 'currentColor',
                  margin: '1.4em 0',
                }}
              >
                <li className="nav__item">
                  <NavLink activeClassName={'active_link'} exact to="/">
                    Demandes en cours
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink activeClassName={'active_link'} exact to="/archive">
                    Demandes traitées
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
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
                    desc: !!showArchived,
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
                getTheadProps={() => ({ style: enrollmentListStyle.thead })}
                getPaginationProps={() => ({
                  style: enrollmentListStyle.pagination,
                })}
                style={enrollmentListStyle.table}
                className="-highlight"
                loading={loading}
                showPageSizeOptions={false}
                pageSize={10}
                resizable={false}
                previousText="Précédent"
                nextText="Suivant"
                loadingText="Chargement..."
                noDataText={
                  showArchived
                    ? 'Aucune demande'
                    : 'Toute les demandes ont été traitées'
                }
                pageText="Page"
                ofText="sur"
                rowsText="lignes"
              />
            </div>
            <p className="text-right">
              <a href="http://api.gouv.fr">
                <button className="button large" name="nouvelle-demande">
                  Nouvelle Demande
                </button>
              </a>
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
  showArchived: PropTypes.bool,
  user: PropTypes.object,
};

EnrollmentList.defaultProps = {
  showArchived: false,
  user: null,
};

export default withUser(EnrollmentList);
