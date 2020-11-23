import React from 'react';
import PropTypes from 'prop-types';

const demande = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    viewBox="0 0 56 56"
  >
    <rect fill="#fff" width="56" height="56" />
    <path
      fill="#cee0f2"
      d="M14.8,41.6V14.4a10,10,0,0,1,10-10H18.7a10,10,0,0,0-10,10V41.6a10,10,0,0,0,10,10h6.07a10,10,0,0,1-10-10Z"
    />
    <path
      fill={`${color || '#0048b3'}`}
      d="M37.2,53.6H18.8a12,12,0,0,1-12-12V14.4a12,12,0,0,1,12-12H37.2a12,12,0,0,1,12,12V41.6A12,12,0,0,1,37.2,53.6ZM18.8,6.4a8,8,0,0,0-8,8V41.6a8,8,0,0,0,8,8H37.2a8,8,0,0,0,8-8V14.4a8,8,0,0,0-8-8Zm20,5.8a2,2,0,0,0-4,0,3,3,0,0,1-3,3H24.2a3,3,0,0,1-3-3,2,2,0,0,0-4,0,7,7,0,0,0,7,7h7.6A7,7,0,0,0,38.8,12.2Z"
    />
    <path
      fill="#ff6f4c"
      d="M37.3,41.9H20.4a2,2,0,0,1,0-4H37.3a2,2,0,0,1,0,4Zm2-9.7a2,2,0,0,0-2-2H33.4a2,2,0,1,0,0,4h3.9A2,2,0,0,0,39.3,32.2ZM26,33l3.84-3.87A2,2,0,0,0,27,26.31l-3.84,3.88h-.06l-1.86-1.88a2,2,0,1,0-2.84,2.82L20.24,33A4,4,0,0,0,26,33Z"
    />
  </svg>
);

demande.propTypes = {
  color: PropTypes.string,
};

demande.defaultProps = {
  color: undefined,
};

export default demande;
