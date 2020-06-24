import React from 'react';

const WarningModal = ({
  handleCancel,
  handleValidate,
  scopeLabel,
  title,
  body,
}) => (
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
);

export default WarningModal;
