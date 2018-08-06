import React from 'react';
import styles from './spinner.css';

export default () => (
  <React.Fragment>
    <div className="spinner" />
    <style
      dangerouslySetInnerHTML={{ __html: styles }} // eslint-disable-line react/no-danger
    />
  </React.Fragment>
);
