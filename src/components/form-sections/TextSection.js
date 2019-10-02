import React from 'react';
import PropTypes from 'prop-types';
import { ScrollablePanel } from '../elements/Scrollable';

const TextSection = ({ id = 'head', title, Description }) => (
  <ScrollablePanel scrollableId={id}>
    <h2>{title}</h2>
    <Description />
  </ScrollablePanel>
);

TextSection.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  Description: PropTypes.func.isRequired,
};

export default TextSection;
