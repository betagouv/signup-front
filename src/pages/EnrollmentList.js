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

const STATUS_LABELS = {
  pending: 'Brouillon',
  sent: 'À valider',
  validated: 'Validée',
  refused: 'Refusée',
};

export const TARGET_API_LABELS = {
  api_particulier: 'API Particulier',
  franceconnect: 'FranceConnect',
  api_droits_cnam: 'API Droits CNAM',
  dgfip: 'API Impot particulier',
  api_entreprise: 'API Entreprise',
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
      page: 0,
      sorted: [
        {
          id: 'updated_at',
          desc: !!this.props.showArchived,
        },
      ],
    };
  }

  async componentDidMount() {
    let enrollments = null;

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('page')) {
      const page = parseInt(urlParams.get('page'));
      this.setState({ page });
    }

    if (urlParams.has('sorted')) {
      const sortedQueryParams = urlParams.getAll('sorted');
      const sorted = [];

      sortedQueryParams.forEach(value => {
        sorted.push({
          id: value.split(':')[0],
          desc: value.split(':')[1] === 'desc',
        });
      });

      this.setState({ sorted });
    }

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
        accessor: ({ id, intitule }) => ({ id, intitule }),
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
        accessor: 'user.email',
        headerStyle: enrollmentListStyle.header,
        style: enrollmentListStyle.cell,
      },
      {
        Header: 'Fournisseur',
        accessor: ({ target_api }) => TARGET_API_LABELS[target_api],
        id: 'target_api',
        headerStyle: enrollmentListStyle.header,
        style: {
          ...enrollmentListStyle.cell,
          ...enrollmentListStyle.centeredCell,
        },
        width: 130,
      },
      {
        Header: 'Statut',
        accessor: ({ status, acl }) => ({
          statusLabel: STATUS_LABELS[status],
          acl,
        }),
        id: 'status',
        headerStyle: enrollmentListStyle.header,
        style: {
          ...enrollmentListStyle.cell,
          ...enrollmentListStyle.centeredCell,
        },
        width: 100,
        Cell: ({ value: { statusLabel, acl } }) => {
          if (!this.hasTriggerableActions({ acl })) {
            return statusLabel;
          }

          return (
            <button className="button warning small">{statusLabel}</button>
          );
        },
        sortMethod: (firstMember, secondMember) => {
          if (firstMember.statusLabel > secondMember.statusLabel) {
            return 1;
          }
          if (firstMember.statusLabel < secondMember.statusLabel) {
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

    if (column.id === 'intitule') {
      return cellValue.intitule;
    }

    if (column.id === 'status') {
      return cellValue.statusLabel;
    }

    if (column.id === 'updated_at') {
      return moment(cellValue).format('llll');
    }

    return cellValue;
  };

  onPageChange = pageIndex => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('page', pageIndex);

    const newQueryString = urlParams.toString();

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}?${newQueryString}`
    );
    this.setState({ page: pageIndex });
  };

  onSortedChange = newSorted => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.delete('sorted');

    newSorted.forEach(({ id, desc }) => {
      urlParams.append('sorted', `${id}:${desc ? 'desc' : 'asc'}`);
    });

    const newQueryString = urlParams.toString();

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}?${newQueryString}`
    );
    this.setState({ sorted: newSorted });
  };

  render() {
    const { history, showArchived, user } = this.props;
    const { enrollments, errors, loading, page, sorted } = this.state;

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
                getTdProps={(state, rowInfo, column) => ({
                  onClick: (e, handleOriginal) => {
                    if (rowInfo) {
                      const {
                        original: { id, target_api },
                      } = rowInfo;
                      history.push(`/${target_api.replace(/_/g, '-')}/${id}`);
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
                page={page}
                pageSize={10}
                onPageChange={this.onPageChange}
                sorted={sorted}
                onSortedChange={this.onSortedChange}
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
