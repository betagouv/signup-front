import React from 'react';
import PropTypes from 'prop-types';
import 'react-table-6/react-table.css';
import ReactTable from 'react-table-6';
import { debounce, filter, isEmpty, pick, pickBy, toPairs } from 'lodash';
import moment from 'moment';

import './AdminEnrollmentList.css';

import { getStateFromUrlParams, openLink, setUrlParamsFromState } from '../lib';
import { getEnrollments } from '../services/enrollments';
import { TARGET_API_LABELS } from '../lib/api';
import { ADMIN_STATUS_LABELS, enrollmentListStyle } from '../lib/enrollment';

import ScheduleIcon from '../components/icons/schedule';
import AddIcon from '../components/icons/add';
import AutorenewIcon from '../components/icons/autorenew';

const { REACT_APP_API_GOUV_HOST: API_GOUV_HOST } = process.env;

class AdminEnrollmentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enrollments: [],
      errors: [],
      loading: true,
      totalPages: 0,
      page: 0,
      sorted: [
        {
          id: 'updated_at',
          desc: false,
        },
      ],
      filtered: [],
      previouslySelectedEnrollmentId: 0,
      archived: false,
    };
  }

  async componentDidMount() {
    this.setState(
      getStateFromUrlParams(
        pick(this.state, [
          'page',
          'sorted',
          'filtered',
          'previouslySelectedEnrollmentId',
          'archived',
        ])
      )
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.totalPages === 0 &&
      this.state.totalPages > prevState.totalPages
    ) {
      const pageMax = this.state.totalPages - 1;
      if (pageMax < this.state.page) {
        this.onPageChange(pageMax);
      }
    }

    setUrlParamsFromState(
      pick(this.state, ['page', 'sorted', 'filtered', 'archived'])
    );
  }

  availableAction = new Set([
    'validate_application',
    'review_application',
    'refuse_application',
    'send_application',
  ]);

  hasTriggerableActions = ({ acl }) =>
    !isEmpty(
      pickBy(acl, (value, key) => value && this.availableAction.has(key))
    );

  getColumnConfiguration = () => [
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
      sortable: true,
      Cell: ({ value: updatedAt }) => {
        if (this.state.archived) {
          return <small>{moment(updatedAt).format('D/M')}</small>;
        }

        const daysFromToday = moment().diff(updatedAt, 'days');
        const color =
          daysFromToday > 5 ? 'red' : daysFromToday > 4 ? 'orange' : 'green';
        return <span style={{ color }}>{daysFromToday}j</span>;
      },
    },
    {
      Header: 'N°',
      accessor: 'id',
      headerStyle: enrollmentListStyle.header,
      style: {
        ...enrollmentListStyle.cell,
        ...enrollmentListStyle.centeredCell,
      },
      width: 60,
      filterable: true,
    },
    {
      Header: 'Raison sociale',
      accessor: 'nom_raison_sociale',
      headerStyle: enrollmentListStyle.header,
      style: enrollmentListStyle.cell,
      filterable: true,
      Placeholder: 'Filtrer par raison sociale',
    },
    {
      Header: 'Demandeur',
      accessor: 'user.email',
      headerStyle: enrollmentListStyle.header,
      style: enrollmentListStyle.cell,
      filterable: true,
      Placeholder: 'Filtrer par email',
    },
    {
      Header: 'Fournisseur',
      accessor: ({ target_api }) => TARGET_API_LABELS[target_api],
      id: 'target_api',
      headerStyle: enrollmentListStyle.header,
      style: enrollmentListStyle.cell,
      width: 130,
      filterable: true,
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          value={filter ? filter.value : ''}
        >
          <option value="">Tous</option>
          {toPairs(TARGET_API_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      ),
    },
    {
      Header: 'Statut',
      accessor: ({ status, acl, is_renewal }) => ({
        statusLabel: ADMIN_STATUS_LABELS[status] || null,
        acl,
        isRenewal: is_renewal,
      }),
      id: 'status',
      headerStyle: enrollmentListStyle.header,
      style: {
        ...enrollmentListStyle.cell,
        ...enrollmentListStyle.centeredCell,
      },
      width: 100,
      filterable: true,
      Cell: ({ value: { statusLabel, acl, isRenewal } }) => {
        if (!this.hasTriggerableActions({ acl })) {
          return (
            <span className="status-label">
              {statusLabel}
              {isRenewal ? <AutorenewIcon size={16} /> : ''}
            </span>
          );
        }

        return (
          <button className="button warning small">
            {statusLabel}
            {isRenewal ? <AutorenewIcon color="white" size={14} /> : ''}
          </button>
        );
      },
      Filter: ({ filter, onChange }) => (
        <select
          onChange={event => onChange(event.target.value)}
          value={filter ? filter.value : ''}
        >
          <option value="">Tous</option>
          {toPairs(ADMIN_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      ),
    },
  ];

  getTitle = ({ column, rowInfo }) => {
    if (!rowInfo) {
      return null;
    }

    // The idea here is to display content as tooltip in case the cell is not large enough to display its whole content
    const cellValue = rowInfo.row[column.id];

    if (column.id === 'status') {
      return cellValue.statusLabel + (cellValue.isRenewal ? ' (copie)' : '');
    }

    if (column.id === 'updated_at') {
      return moment(cellValue).format('llll');
    }

    return cellValue;
  };

  onPageChange = newPage => {
    this.setState({ page: newPage });
  };

  onSortedChange = newSorted => {
    this.setState({ sorted: newSorted });
  };

  onFilteredChange = newFiltered => {
    this.setState({ filtered: newFiltered, page: 0 });
  };

  onArchivedChange = newArchived => {
    let filtered = [];
    // If the user clicks once, we change the category (archived or ongoing) without clearing filters.
    // If the user clicks twice, we stay on the category and we clear the filter.
    // That provides a way to clear all filter without reloading the page.
    if (this.state.archived !== newArchived) {
      filtered = filter(this.state.filtered, ({ id }) => id !== 'status');
    }

    this.setState({
      archived: newArchived,
      sorted: [
        {
          id: 'updated_at',
          desc: !!newArchived,
        },
      ],
      filtered,
      page: 0,
      previouslySelectedEnrollmentId: 0,
    });
  };

  savePreviouslySelectedEnrollmentId = id => {
    setUrlParamsFromState({ previouslySelectedEnrollmentId: id });
  };

  onFetchData = async () => {
    this.setState({ loading: true });
    // Read the state from this.state and not from internally computed react table state
    // (passed as param of this function) as react table will reset page count to zero
    // on filter update. This breaks page selection on page load.
    const { page, sorted, filtered, archived } = this.state;

    const {
      enrollments,
      meta: { total_pages: totalPages },
    } = await getEnrollments({
      page,
      sortBy: sorted,
      filter: filtered,
      archived,
    });

    this.setState({
      enrollments,
      totalPages,
      loading: false,
    });
  };

  // this is a workaround for a react-table issue
  // see https://github.com/tannerlinsley/react-table/issues/1333#issuecomment-504046261
  debouncedFetchData = debounce(this.onFetchData, 100);

  componentWillUnmount() {
    this.debouncedFetchData.cancel();
  }

  render() {
    const { history } = this.props;
    const {
      enrollments,
      errors,
      loading,
      page,
      sorted,
      filtered,
      archived,
      previouslySelectedEnrollmentId,
      totalPages,
    } = this.state;
    return (
      <section className="section-grey full-width-section enrollment-page">
        <div className="container">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2>Liste des demandes</h2>
              <ul className="nav__links">
                <li className="nav__item">
                  <button
                    className={`nav-button ${!archived ? 'active_link' : ''}`}
                    onClick={() => this.onArchivedChange(false)}
                  >
                    Demandes en cours
                  </button>
                </li>
                <li className="nav__item">
                  <button
                    className={`nav-button ${archived ? 'active_link' : ''}`}
                    onClick={() => this.onArchivedChange(true)}
                  >
                    Demandes traitées
                  </button>
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
                manual
                data={enrollments}
                pages={totalPages}
                columns={this.getColumnConfiguration()}
                getTdProps={(state, rowInfo, column) => ({
                  onClick: (e, handleOriginal) => {
                    if (rowInfo) {
                      const {
                        original: { id, target_api },
                      } = rowInfo;
                      const targetUrl = `/${target_api.replace(
                        /_/g,
                        '-'
                      )}/${id}`;

                      this.savePreviouslySelectedEnrollmentId(id);

                      openLink(e, history, targetUrl);
                    }

                    if (handleOriginal) {
                      handleOriginal();
                    }
                  },
                  title: this.getTitle({ column, rowInfo }),
                  className:
                    rowInfo &&
                    rowInfo.original.id === previouslySelectedEnrollmentId
                      ? 'selected'
                      : null,
                })}
                getTheadProps={() => ({ style: enrollmentListStyle.thead })}
                getTheadFilterThProps={() => ({
                  style: enrollmentListStyle.filterThead,
                })}
                getPaginationProps={() => ({
                  style: enrollmentListStyle.pagination,
                })}
                style={enrollmentListStyle.table}
                className="-highlight"
                loading={loading}
                showPageSizeOptions={false}
                pageSize={10}
                page={page}
                onPageChange={this.onPageChange}
                sortable={false}
                sorted={sorted}
                onSortedChange={this.onSortedChange}
                filtered={filtered}
                onFilteredChange={this.onFilteredChange}
                onFetchData={this.debouncedFetchData}
                resizable={false}
                previousText="Précédent"
                nextText="Suivant"
                loadingText="Chargement..."
                noDataText={
                  archived
                    ? 'Aucune demande'
                    : 'Toute les demandes ont été traitées'
                }
                pageText="Page"
                ofText="sur"
                rowsText="lignes"
              />
            </div>
            <p className="align-right">
              <a href={`${API_GOUV_HOST}/datapass/api`}>
                <button className="button large" name="nouvelle-demande">
                  Nouvelle Demande
                  <div className="button-icon">
                    <AddIcon color="white" />
                  </div>
                </button>
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

AdminEnrollmentList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default AdminEnrollmentList;
