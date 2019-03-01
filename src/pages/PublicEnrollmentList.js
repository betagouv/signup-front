import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import moment from 'moment';

import { getPublicValidatedEnrollments } from '../lib/services';
import ScheduleIcon from '../components/icons/schedule';
import {
  enrollmentListStyle,
  FOURNISSEUR_DE_DONNEES_LABELS,
} from './EnrollmentList';

class PublicEnrollmentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enrollments: [],
      errors: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const enrollments = await getPublicValidatedEnrollments(
      this.props.match.params.fournisseurDeDonnees
    );

    this.setState({
      enrollments: enrollments.map(enrollment => {
        return enrollment;
      }),
      loading: false,
    });
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.match.params.fournisseurDeDonnees !==
      prevProps.match.params.fournisseurDeDonnees
    ) {
      this.setState({
        enrollments: [],
        errors: [],
        loading: true,
      });

      const enrollments = await getPublicValidatedEnrollments(
        this.props.match.params.fournisseurDeDonnees
      );

      this.setState({
        enrollments: enrollments.map(enrollment => {
          return enrollment;
        }),
        loading: false,
      });
    }
  }

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
      Cell: ({ value: updatedAt }) => (
        <small>{moment(updatedAt).format('D/M')}</small>
      ),
    },
    {
      Header: 'Organisation',
      accessor: 'nom_raison_sociale',
      headerStyle: enrollmentListStyle.header,
      style: enrollmentListStyle.cell,
    },
    {
      Header: 'SIRET',
      accessor: 'siret',
      headerStyle: enrollmentListStyle.header,
      style: enrollmentListStyle.cell,
    },
    {
      Header: 'Intitulé',
      accessor: 'intitule',
      headerStyle: enrollmentListStyle.header,
      style: enrollmentListStyle.cell,
    },
    {
      Header: 'Responsable traitement',
      accessor: 'email_responsable_traitement',
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
  ];

  getTitle = ({ column, rowInfo }) => {
    if (!rowInfo) {
      return null;
    }

    // The idea here is to display content as tooltip in case the cell is not large enough to display its whole content
    const cellValue = rowInfo.row[column.id];

    if (column.id === 'updated_at') {
      return moment(cellValue).format('llll');
    }

    return cellValue;
  };

  render() {
    const { enrollments, errors, loading } = this.state;

    return (
      <section className="section-grey enrollment-page">
        <div className="container">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2>Liste des demandes validées</h2>
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
                  <NavLink activeClassName={'active_link'} exact to="/public">
                    Toutes les demandes
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    activeClassName={'active_link'}
                    exact
                    to="/public/franceconnect"
                  >
                    Demandes FranceConnect
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    activeClassName={'active_link'}
                    exact
                    to="/public/api-particulier"
                  >
                    Demandes API Particulier
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
                columns={this.getColumnConfiguration()}
                defaultSorted={[
                  {
                    id: 'updated_at',
                    desc: true,
                  },
                ]}
                getTdProps={(state, rowInfo, column) => ({
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
                noDataText={'Aucune demande'}
                pageText="Page"
                ofText="sur"
                rowsText="lignes"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

PublicEnrollmentList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      fournisseurDeDonnees: PropTypes.string,
    }),
  }),
};

PublicEnrollmentList.defaultProps = {
  match: {
    params: {
      fournisseurDeDonnees: null,
    },
  },
};

export default PublicEnrollmentList;
