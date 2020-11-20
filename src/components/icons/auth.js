import React from 'react';
import PropTypes from 'prop-types';

const auth = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56">
    <defs>
      <style
        dangerouslySetInnerHTML={{
          __html: `.a{fill:#fff;}.b{fill:#cee0f2;}.c{fill:${color ||
            '#0048b3'};}.d{fill:#ff6f4c;}`,
        }}
      />
    </defs>
    <rect class="a" width="56" height="56" />
    <path
      class="b"
      d="M26.42,26.84A11.5,11.5,0,1,1,26.42,5a11.5,11.5,0,0,0,0,21.88ZM36.65,45.6V42.9a6,6,0,0,1,6-6h-6a6,6,0,0,0-6,6v2.7a6,6,0,0,0,6,6h6A6,6,0,0,1,36.65,45.6Z"
    />
    <path
      class="c"
      d="M46.15,35.34V32.7a6,6,0,1,0-12,0v2.6a8,8,0,0,0-5.5,7.6v2.7a8,8,0,0,0,8,8h6.9a8,8,0,0,0,8-8V42.9A8,8,0,0,0,46.15,35.34Zm-8-2.64a2,2,0,1,1,4,0v2.2h-4Zm9.4,12.9a4,4,0,0,1-4,4h-6.9a4,4,0,0,1-4-4V42.9a4,4,0,0,1,4-4h6.9a4,4,0,0,1,4,4ZM37.45,15.9A13.5,13.5,0,1,0,24,29.4,13.52,13.52,0,0,0,37.45,15.9ZM24,25.4a9.5,9.5,0,1,1,9.5-9.5A9.51,9.51,0,0,1,24,25.4Z"
    />
    <path
      class="d"
      d="M6.45,53.6a2,2,0,0,1-2-2,18.21,18.21,0,0,1,18.2-18.2h2a2,2,0,0,1,0,4h-2A14.22,14.22,0,0,0,8.45,51.6,2,2,0,0,1,6.45,53.6ZM40.08,41.8a2.5,2.5,0,1,0,2.5,2.5A2.5,2.5,0,0,0,40.08,41.8Z"
    />
  </svg>
);

auth.propTypes = {
  color: PropTypes.string,
};

auth.defaultProps = {
  color: 'none',
};

export default auth;
