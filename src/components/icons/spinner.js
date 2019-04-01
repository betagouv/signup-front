import React from 'react';
import PropTypes from 'prop-types';
import './spinner.css';

const Spinner = ({ inline }) => (
  <span className={`spinner${inline ? ' inline' : ''}`} />
);

Spinner.propTypes = {
  inline: PropTypes.bool,
};

Spinner.defaultProps = {
  inline: false,
};

export default Spinner;
