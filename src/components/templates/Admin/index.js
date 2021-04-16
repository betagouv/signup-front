import React from 'react';
import UpdateRgpdContact from './UpdateRgpdContact';
import UserList from './UserList';
import AddUser from './AddUser';
import UpdateOwner from './UpdateOwner';

export const Admin = () => (
  <section className="section-grey full-width-section user-page">
    <div className="container">
      <h1>Administration</h1>
      <div className="notification warning">
        <b>« Un grand pouvoir implique de grandes responsabilités »</b>
        <i> - Ben Parker, oncle de Spider-man</i>
      </div>
      <UserList />
      <AddUser />
      <UpdateRgpdContact />
      <UpdateOwner />
    </div>
  </section>
);

export default Admin;
