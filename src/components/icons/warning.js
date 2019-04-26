import React from 'react';
import PropTypes from 'prop-types';

// Source: https://material.io/tools/icons/?icon=warning&style=baseline
const WarningIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill={color} />
  </svg>
);

WarningIcon.propTypes = {
  color: PropTypes.string,
};

WarningIcon.defaultProps = {
  color: 'none',
};

export default WarningIcon;
