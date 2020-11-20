import React from 'react';
import PropTypes from 'prop-types';

const habilitation = ({ color }) => (
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
      d="M8.75,42.83V24.56a11,11,0,0,1,11-10.94H13.41A10.93,10.93,0,0,0,2.48,24.56V42.83A10.93,10.93,0,0,0,13.41,53.76h6.35A11,11,0,0,1,8.75,42.83Z"
    />
    <path
      class="c"
      d="M19.8,56H13.12A13.14,13.14,0,0,1,0,42.88V24.94A13.14,13.14,0,0,1,13.12,11.81H42.87A13.14,13.14,0,0,1,56,24.94V31.5a2.19,2.19,0,1,1-4.38,0V24.94a8.75,8.75,0,0,0-8.75-8.75H13.12a8.75,8.75,0,0,0-8.74,8.75V42.88a8.75,8.75,0,0,0,8.74,8.74H19.8a2.19,2.19,0,0,1,0,4.38ZM56,49.33V43.55a6.7,6.7,0,0,0-6.69-6.69H43.53a2.19,2.19,0,1,0,0,4.37h5.78a2.31,2.31,0,0,1,2.31,2.32v5.78a2.19,2.19,0,1,0,4.38,0ZM48.39,48a2.19,2.19,0,1,0-3.16-3,21.6,21.6,0,0,1-15.55,6.65h-1a2.19,2.19,0,1,0,0,4.38h1A26,26,0,0,0,48.39,48ZM14.33,22.09a2.74,2.74,0,1,0,2.73,2.74A2.74,2.74,0,0,0,14.33,22.09Zm9.4,0a2.74,2.74,0,1,0,2.74,2.74A2.74,2.74,0,0,0,23.73,22.09Zm9.41,0a2.74,2.74,0,1,0,2.74,2.74A2.74,2.74,0,0,0,33.14,22.09ZM14.33,31.5a2.74,2.74,0,1,0,2.73,2.73A2.74,2.74,0,0,0,14.33,31.5Zm0,9.41a2.74,2.74,0,1,0,2.73,2.73A2.74,2.74,0,0,0,14.33,40.91Zm9.4-9.41a2.74,2.74,0,1,0,2.74,2.73A2.73,2.73,0,0,0,23.73,31.5Zm0,9.41a2.74,2.74,0,1,0,2.74,2.73A2.73,2.73,0,0,0,23.73,40.91Zm9.41-9.41a2.74,2.74,0,1,0,2.74,2.73A2.73,2.73,0,0,0,33.14,31.5Z"
    />
    <path
      class="d"
      d="M19.91,8.75a2.19,2.19,0,0,1-2.19-2.19,2.19,2.19,0,0,0-4.38,0A2.19,2.19,0,1,1,9,6.56a6.56,6.56,0,0,1,13.12,0A2.19,2.19,0,0,1,19.91,8.75ZM47.25,6.56a6.57,6.57,0,0,0-13.13,0,2.19,2.19,0,1,0,4.38,0,2.19,2.19,0,0,1,4.37,0,2.19,2.19,0,1,0,4.38,0Zm-4.7,15.53a2.74,2.74,0,1,0,2.73,2.74A2.74,2.74,0,0,0,42.55,22.09Z"
    />
  </svg>
);

habilitation.propTypes = {
  color: PropTypes.string,
};

habilitation.defaultProps = {
  color: 'none',
};

export default habilitation;
