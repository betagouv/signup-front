import React, { useState } from 'react';
import './ExpandableQuote.css';
import InfoIcon from '../icons/info';
import UnfoldLessIcon from '../icons/unfold-less';
import UnfoldMoreIcon from '../icons/unfold-more';

export const ExpandableQuote = ({ title, large, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="form__group">
      <div
        className={`expandable-quote ${expanded ? 'expanded' : ''} ${
          large ? 'large' : ''
        }`}
      >
        <div
          className="expandable-quote-header"
          onClick={() => setExpanded(!expanded)}
        >
          <InfoIcon color={'var(--blue)'} />
          <div>{title}</div>
          {expanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
        </div>
        <div className={`expandable-quote-content`}>{children}</div>
      </div>
    </div>
  );
};

export default ExpandableQuote;
