import React from 'react';
import AriaModal from '@justfixnyc/react-aria-modal';

const ConfirmationModal = ({
  handleCancel,
  handleConfirm,
  title,
  children,
  okLabel,
  nokLabel,
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
        {children}
        <button
          id="close-warning-modal"
          className="closing_cross"
          onClick={handleCancel}
          aria-label={nokLabel || 'Annuler'}
        >
          ×
        </button>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="button-outline large primary"
            onClick={handleCancel}
          >
            {nokLabel || 'Annuler'}
          </button>
          <button className="button large" onClick={handleConfirm}>
            {okLabel || 'Confirmer'}
          </button>
        </div>
      </div>
    </div>
  </AriaModal>
);

export default ConfirmationModal;
