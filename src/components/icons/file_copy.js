import React from 'react';
import PropTypes from 'prop-types';

// Source: https://material.io/resources/icons/?icon=file_copy&style=outline
const FileCopyIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z"
      fill={color}
    />
  </svg>
);

FileCopyIcon.propTypes = {
  color: PropTypes.string,
};

FileCopyIcon.defaultProps = {
  color: 'none',
};

export default FileCopyIcon;
