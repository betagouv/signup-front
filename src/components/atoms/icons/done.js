import React from 'react';
import PropTypes from 'prop-types';

// Source: https://material.io/tools/icons/?icon=done&style=baseline
const DoneIcon = ({ color, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill={color} />
  </svg>
);

DoneIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

DoneIcon.defaultProps = {
  color: 'none',
  size: 24,
};

export default DoneIcon;
