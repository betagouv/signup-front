import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
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

import { USER_STATUS_LABELS } from '../lib/enrollment';
import { getAPIStats } from '../lib/services';
import {
  TARGET_API_LABELS,
  TARGET_API_WITH_ENROLLMENTS_IN_PRODUCTION_ENV,
} from '../lib/api';

import Helper from '../components/Helper';
import Spinner from '../components/icons/spinner';

// inspired from https://coolors.co/1a535c-4ecdc4-f7fff7-ff6b6b-ffe66d
const COLORS = ['#1A535C', '#4ECDC4', '#FF6B6B', '#FFE66D', '#50514F'];

export default ({
  match: {
    params: { targetApi },
  },
}) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const result = await getAPIStats(targetApi);
      setStats(result.data);
    }

    fetchStats();
  }, [targetApi]);

  if (!stats) {
    return (
      <section className="section-grey section-full-page">
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
            {TARGET_API_WITH_ENROLLMENTS_IN_PRODUCTION_ENV.map(targetApi => (
              <li key={targetApi} className="nav__item">
                <NavLink
                  activeClassName={'active_link'}
                  exact
                  to={`/stats/${targetApi}`}
                >
                  {TARGET_API_LABELS[targetApi]}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="column-grid">
          <div className="row-grid">
            <div className="card">
              <div className="card__content">
                <h3>Demandes d'habilitation déposées</h3>
              </div>
              <div className="card__content card_number">
                {stats.enrollment_count}
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
                <div>{stats.validated_enrollment_count}</div>
              </div>
            </div>
            <div className="card">
              <div className="card__content">
                <h3>
                  Temps moyen de traitement des demandes
                  <Helper title="temps moyen entre la première soumission d'une demande jusqu'à sa validation ou son refus" />
                </h3>
                <div className="card__meta">(en jours)</div>
              </div>
              <div className="card__content card_number">
                {stats.average_processing_time_in_days}
              </div>
            </div>
          </div>
          <div className="row-grid">
            <div className="card">
              <div className="card__content">
                <h3>Demandes d'habilitation déposées</h3>
              </div>
              <div className="card__content card_graph">
                <ResponsiveContainer width={'100%'} height={250}>
                  <BarChart
                    data={stats.monthly_enrollment_count.map(item => ({
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
          <div className="row-grid">
            <div className="card">
              <div className="card__content">
                <h3>Répartition des demandes par API</h3>
              </div>
              <div className="card__content card_graph">
                <ResponsiveContainer width={'100%'} height={250}>
                  <PieChart>
                    <Pie
                      data={stats.enrollment_by_target_api}
                      dataKey="count"
                      label
                    >
                      {stats.enrollment_by_status.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
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
                    <Pie
                      data={stats.enrollment_by_status}
                      dataKey="count"
                      label
                    >
                      {stats.enrollment_by_status.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      layout={'vertical'}
                      align={'right'}
                      verticalAlign={'middle'}
                      formatter={value => USER_STATUS_LABELS[value]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
