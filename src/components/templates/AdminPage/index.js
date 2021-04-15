import React from 'react';
import RgpdUpdate from './RgpdUpdate';
import UserList from './UserList';
import AddUser from './AddUser';

export const AdminPage = () => (
  <section className="section-grey full-width-section user-page">
    <div className="container">
      <h1>Administration</h1>
      <UserList />
      <AddUser />
      <RgpdUpdate />
    </div>
  </section>
);

export default AdminPage;
