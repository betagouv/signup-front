import React from 'react';
import UpdateRgpdContact from './UpdateRgpdContact';
import UserList from './UserList';
import AddUser from './AddUser';
import UpdateOwner from './UpdateOwner';

export const AdminPage = () => (
  <section className="section-grey full-width-section user-page">
    <div className="container">
      <h1>Administration</h1>
      <UserList />
      <AddUser />
      <UpdateRgpdContact />
      <UpdateOwner />
    </div>
  </section>
);

export default AdminPage;
