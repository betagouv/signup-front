import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import './Stats.css';
import Spinner from '../components/icons/spinner';
import moment from 'moment';
import { TARGET_API_LABELS, STATUS_LABELS } from './EnrollmentList';
import { NavLink } from 'react-router-dom';
import { hashToQueryParams } from '../lib/utils';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;
// inspired from https://coolors.co/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d
const COLORS = ['#1A535C', '#4ECDC4', '#FF6B6B', '#FFE66D', '#50514F'];

export default ({
  match: {
    params: { targetApi },
  },
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `${BACK_HOST}/api/stats${hashToQueryParams({ target_api: targetApi })}`
      );
      setData(result.data);
    }

    fetchData();
  }, [targetApi]);

  if (!data) {
    return (
      <section className="section-grey loader">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="section-grey stats-page">
      <div className="container">
        <div className="tab-container">
          <ul className="nav__links">
            <li className="nav__item">
              <NavLink activeClassName={'active_link'} exact to="/stats">
                Toutes les APIs
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                activeClassName={'active_link'}
                exact
                to="/stats/franceconnect"
              >
                FranceConnect
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                activeClassName={'active_link'}
                exact
                to="/stats/api_particulier"
              >
                API Particulier
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                activeClassName={'active_link'}
                exact
                to="/stats/api_entreprise"
              >
                API Entreprise
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="card">
            <div className="card__content">
              <h3>Demandes d'habilitation déposées</h3>
            </div>
            <div className="card__content card_number">
              {data.enrollment_count}
            </div>
          </div>
          <div className="card">
            <div className="card__content">
              <h3>Demandes d'habilitation validées</h3>
              <div className="card__meta">
                (<a href="/public">voir la liste détaillée</a>)
              </div>
            </div>
            <div className="card__content card_number">
              <div>{data.validated_enrollment_count}</div>
            </div>
          </div>
          <div className="card">
            <div className="card__content">
              <h3>Temps moyen de traitement des demandes</h3>
              <div className="card__meta">(en jours)</div>
            </div>
            <div className="card__content card_number">
              {Math.round(data.average_processing_time_in_days * 100) / 100}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="card__content">
              <h3>Demandes d'habilitation déposées</h3>
            </div>
            <div className="card__content card_graph">
              <ResponsiveContainer width={'100%'} height={250}>
                <BarChart
                  data={data.monthly_enrollment_count.map(item => ({
                    ...item,
                    month: moment(item.month).format('MMM YY'),
                  }))}
                >
                  <XAxis dataKey="month" />
                  <YAxis dataKey="count" />
                  <Bar dataKey="count" fill={COLORS[3]}>
                    <LabelList dataKey="count" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="card__content">
              <h3>Répartition des demandes par API</h3>
            </div>
            <div className="card__content card_graph">
              <ResponsiveContainer width={'100%'} height={250}>
                <PieChart>
                  <Pie
                    data={data.enrollment_by_target_api}
                    dataKey="count"
                    label
                  >
                    {data.enrollment_by_status.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    layout={'vertical'}
                    align={'right'}
                    verticalAlign={'middle'}
                    formatter={value => TARGET_API_LABELS[value]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card">
            <div className="card__content">
              <h3>Répartition des demandes par statut</h3>
            </div>
            <div className="card__content card_graph">
              <ResponsiveContainer width={'100%'} height={250}>
                <PieChart>
                  <Pie data={data.enrollment_by_status} dataKey="count" label>
                    {data.enrollment_by_status.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    layout={'vertical'}
                    align={'right'}
                    verticalAlign={'middle'}
                    formatter={value => STATUS_LABELS[value]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
