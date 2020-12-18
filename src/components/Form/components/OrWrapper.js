import React from 'react';
import './OrWrapperStyle.css';

export const OrWrapper = ({ children = [], ...props }) => {
  return (
    <div id="or-input-form" className="form__group">
      {children.map((child, index) => (
        <>
          <div>{child}</div>
          {index < children.length - 1 && (
            <div className="separator">
              <span>ou</span>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default OrWrapper;
