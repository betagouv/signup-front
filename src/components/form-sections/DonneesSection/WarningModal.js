import React from 'react';
import AriaModal from 'react-aria-modal';

const WarningModal = ({
  handleCancel,
  handleValidate,
  scopeLabel,
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
          aria-label={`Ne pas demander la donnée « ${scopeLabel} »`}
        >
          ×
        </button>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="button large warning" onClick={handleValidate}>
            Demander la donnée « {scopeLabel} »
          </button>
        </div>
      </div>
    </div>
  </AriaModal>
);

export default WarningModal;
