import React from 'react';
import PropTypes from 'prop-types';

// https://material.io/resources/icons/?icon=unfold_more&style=baseline
const UnfoldMoreIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={color}
    width="24px"
    height="24px"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />
  </svg>
);

UnfoldMoreIcon.propTypes = {
  color: PropTypes.string,
};

UnfoldMoreIcon.defaultProps = {
  color: 'black',
};

export default UnfoldMoreIcon;
