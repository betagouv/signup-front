import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import _, { debounce, toPairs } from 'lodash';
import moment from 'moment';

import './AdminEnrollmentList.css';

import { openLink } from '../lib/utils';
import { getEnrollments } from '../lib/services';
import { TARGET_API_LABELS } from '../lib/api';
import { ADMIN_STATUS_LABELS, enrollmentListStyle } from '../lib/enrollment';

import ScheduleIcon from '../components/icons/schedule';
import AddIcon from '../components/icons/add';

class AdminEnrollmentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enrollments: [],
      errors: [],
      loading: true,
      page: 0,
      totalPages: 0,
      sorted: [
        {
          id: 'updated_at',
          desc: !!this.props.showArchived,
        },
      ],
      filtered: [],
      previouslySelectedEnrollmentId: null,
    };
  }

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('page')) {
      const page = parseInt(urlParams.get('page')) || 0;
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

    if (urlParams.has('filtered')) {
      const sortedQueryParams = urlParams.getAll('filtered');
      const filtered = [];

      sortedQueryParams.forEach(value => {
        filtered.push({
          id: value.split(':')[0],
          value: value.split(':')[1],
        });
      });

      this.setState({ filtered });
    }

    if (urlParams.has('previouslySelectedEnrollmentId')) {
      const previouslySelectedEnrollmentId = parseInt(
        urlParams.get('previouslySelectedEnrollmentId')
      );

      this.setState({ previouslySelectedEnrollmentId });
    }
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
      accessor: ({ status, acl }) => ({
        statusLabel: ADMIN_STATUS_LABELS[status] || null,
        acl,
      }),
      id: 'status',
      headerStyle: enrollmentListStyle.header,
      style: {
        ...enrollmentListStyle.cell,
        ...enrollmentListStyle.centeredCell,
      },
      width: 100,
      filterable: true,
      Cell: ({ value: { statusLabel, acl } }) => {
        if (!this.hasTriggerableActions({ acl })) {
          return statusLabel;
        }

        return <button className="button warning small">{statusLabel}</button>;
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
      return cellValue.statusLabel;
    }

    if (column.id === 'updated_at') {
      return moment(cellValue).format('llll');
    }

    return cellValue;
  };

  onPageChange = newPage => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('page', newPage);

    const newQueryString = urlParams.toString();

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}?${newQueryString}`
    );
    this.setState({ page: newPage });
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

  onFilteredChange = newFiltered => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.delete('filtered');

    newFiltered.forEach(({ id, value }) => {
      urlParams.append('filtered', `${id}:${value}`);
    });

    urlParams.set('page', '0');

    const newQueryString = urlParams.toString();

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}?${newQueryString}`
    );
    this.setState({ filtered: newFiltered, page: 0 });
  };

  savePreviouslySelectedEnrollmentId = id => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('previouslySelectedEnrollmentId', id);

    const newQueryString = urlParams.toString();

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}?${newQueryString}`
    );
  };

  onFetchData = async () => {
    this.setState({ loading: true });
    // Read the state from this.state and not from internally computed react table state
    // (passed as param of this function) as react table will reset page count to zero
    // on filter update. This breaks page selection on page load.
    const { page, sorted, filtered } = this.state;

    const {
      enrollments,
      meta: { total_pages: totalPages },
    } = await getEnrollments({
      page,
      sortBy: sorted,
      filter: filtered,
      archived: this.props.showArchived,
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
    const { history, showArchived } = this.props;
    const {
      enrollments,
      errors,
      loading,
      page,
      sorted,
      filtered,
      previouslySelectedEnrollmentId,
      totalPages,
    } = this.state;
    return (
      <section className="section-grey enrollment-page">
        <div className="container">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2>Liste des demandes</h2>
              <ul className="nav__links">
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
                  showArchived
                    ? 'Aucune demande'
                    : 'Toute les demandes ont été traitées'
                }
                pageText="Page"
                ofText="sur"
                rowsText="lignes"
              />
            </div>
            <p className="align-right">
              <a href="https://api.gouv.fr/?filter=signup">
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
  showArchived: PropTypes.bool,
};

AdminEnrollmentList.defaultProps = {
  showArchived: false,
};

export default AdminEnrollmentList;
