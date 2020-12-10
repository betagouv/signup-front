import React from 'react';
import AriaModal from '@justfixnyc/react-aria-modal';

const ConfirmationModal = ({
  handleConfirm,
  confirmLabel = 'Confirmer',
  handleCancel,
  cancelLabel = 'Annuler',
  title,
  children,
  theme = 'primary',
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
          aria-label={cancelLabel}
        >
          ×
        </button>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className={`button-outline large ${theme}`}
            onClick={handleCancel}
          >
            {cancelLabel}
          </button>
          <button className={`button large ${theme}`} onClick={handleConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  </AriaModal>
);

export default ConfirmationModal;
