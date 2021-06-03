import React from 'react';
import './style.css';

const Loader = ({ message = null, small = false }) => {
  return (
    <div className="loader-container layout-center layout-column">
      {!!message && <div className="message">{message}</div>}
      <div className={`loader ${small ? 'small' : ''}`} />
    </div>
  );
};

export default Loader;
