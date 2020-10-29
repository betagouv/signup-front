import React from 'react';
import AriaModal from '@justfixnyc/react-aria-modal';

const WarningModal = ({
  handleCancel,
  handleValidate,
  okLabel,
  koLabel,
  title,
  body,
}) => (
  <AriaModal
    titleText={title}
    onExit={handleCancel}
    focusDialog={true}
    getApplicationNode={() => document.getElementById('root')}
    scrollDisabled={false}
    alert={true}
  >
    <div
      className="modal__backdrop"
      id="modal"
      style={{ display: 'flex' }}
      onClick={handleCancel}
    >
      <div className="modal">
        <h3>{title}</h3>
        <p>{body}</p>
        <button
          id="close-warning-modal"
          className="closing_cross"
          onClick={handleCancel}
          aria-label={koLabel}
        >
          ×
        </button>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="button large warning" onClick={handleValidate}>
            {okLabel}
          </button>
        </div>
      </div>
    </div>
  </AriaModal>
);

export default WarningModal;
