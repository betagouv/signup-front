import React from 'react';

export const SideBySideWrapper = ({ children = [] }) => (
  <div className="form-row">
    {children.slice(0, 2).map((child, index) =>
      child ? (
        <div key={index} className="form-col">
          {child}
        </div>
      ) : null
    )}
  </div>
);

export default SideBySideWrapper;
