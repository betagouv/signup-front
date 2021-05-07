import React from 'react';

// Source: https://material.io/resources/icons/?icon=add&style=baseline
const AddIcon = ({ color = 'var(--theme-dark-text)', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
  </svg>
);

export default AddIcon;
