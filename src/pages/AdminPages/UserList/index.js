import React, { useEffect, useMemo, useState } from 'react';

import { TARGET_API_LABELS } from '../../../lib/api';
import { getUsers } from '../../../services/users';
import Spinner from '../../../components/icons/spinner';
import Table from './Table';
import RoleCheckboxCell from './RoleCheckboxCell';
import { TextFilter, textFilter } from './TextFilter';

const UserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [skipReset, setSkipReset] = React.useState(false);

  const filterTypes = React.useMemo(
    () => ({
      text: textFilter,
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'email',
        Filter: TextFilter,
        filter: 'text',
      },
      ...Object.keys(TARGET_API_LABELS).map(targetApi => ({
        Header: () => (
          <span style={{ writingMode: 'vertical-rl' }}>
            {`${TARGET_API_LABELS[targetApi]}`}
          </span>
        ),
        id: targetApi,
        columns: ['reporter', 'instructor', 'subscriber'].map(roleType => ({
          Header: `${roleType[0]}`,
          id: `${targetApi}:${roleType}`,
          accessor: ({ roles }) => roles.includes(`${targetApi}:${roleType}`),
          Cell: RoleCheckboxCell,
        })),
      })),
      { Header: 'Id', accessor: 'id' },
    ],
    []
  );

  const updateRole = (rowIndex, columnId, value) => {
    setSkipReset(true);
    setUsers(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          const newRoles = value
            ? [...row.roles, columnId]
            : row.roles.filter(e => e !== columnId);
          return {
            ...old[rowIndex],
            roles: newRoles,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    setSkipReset(false);
  }, [users]);

  useEffect(() => {
    const onFetchData = async () => {
      setIsLoading(true);
      const { users } = await getUsers({ usersWithRolesOnly: !showAllUsers });
      setUsers(users);
      setIsLoading(false);
    };

    onFetchData();
  }, [showAllUsers]);

  return (
    <section className="section-grey full-width-section user-page">
      <div className="container">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>Liste des utilisateurs</h2>
            <ul className="nav__links">
              <li className="nav__item">
                <button
                  className={`nav-button ${!showAllUsers ? 'active_link' : ''}`}
                  onClick={() => setShowAllUsers(false)}
                >
                  Utilisateurs avec droits
                </button>
              </li>
              <li className="nav__item">
                <button
                  className={`nav-button ${showAllUsers ? 'active_link' : ''}`}
                  onClick={() => setShowAllUsers(true)}
                >
                  Tous les utilisateurs
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="panel">
          {isLoading ? (
            <div className="section-full-page" style={{ minHeight: '800px' }}>
              <Spinner />
            </div>
          ) : (
            <>
              <Table
                columns={columns}
                data={users}
                updateData={updateRole}
                filterTypes={filterTypes}
                skipReset={skipReset}
                initialState={{ hiddenColumns: ['id'] }}
              />
              <div>
                Légende :
                <ul>
                  <li>r (reporter) : rapporteur</li>
                  <li>i (instructor) : instructeur</li>
                  <li>s (subscriber) : abonné</li>
                </ul>
                <a href="https://github.com/betagouv/datapass#les-roles-dans-data-pass">
                  Plus d'info
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserList;
