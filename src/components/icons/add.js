import React from 'react';
import PropTypes from 'prop-types';

// Source: https://material.io/tools/icons/?icon=arrow_back&style=baseline https://material.io/tools/icons/static/icons/baseline-arrow_back-24px.svg
const AddIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
  </svg>
);

AddIcon.propTypes = {
  color: PropTypes.string,
};

AddIcon.defaultProps = {
  color: 'none',
};

export default AddIcon;
