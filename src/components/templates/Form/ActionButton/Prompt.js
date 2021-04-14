import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Prompt.css';
import EditIcon from '../../../atoms/icons/edit';
import useMostUsedComments from './useMostUsedComments';
import {
  getMailAttributes,
  getMailFooter,
  getMailHeader,
} from '../../../../lib/enrollment-mailer-templates';

const Prompt = ({
  onAccept,
  onCancel,
  acceptCssClass,
  acceptLabel,
  selectedAction,
  targetApi,
  ownerEmailAddress,
}) => {
  const [input, setInput] = useState('');
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState('');
  const [fullEditMode, setFullEditMode] = useState(false);
  const templates = useMostUsedComments(selectedAction, targetApi);

  const handleInputChange = event => {
    setInput(event.target.value);
  };

  const handleAccept = () => {
    onAccept(input, fullEditMode);
  };

  const handleTemplateChange = event => {
    const newTemplateIndex = event.target.value;

    if (newTemplateIndex !== '') {
      setSelectedTemplateIndex(newTemplateIndex);
      setInput(templates[newTemplateIndex]);
    }
  };

  const { senderAddress, subject } = getMailAttributes(
    selectedAction,
    targetApi
  );
  const mailHeader = getMailHeader(selectedAction, targetApi);
  const mailFooter = getMailFooter(selectedAction, targetApi);

  const switchToFullEditMode = () => {
    setInput(`${mailHeader}

${input}

${mailFooter}`);
    setFullEditMode(true);
  };

  const promptMessage = {
    notify: 'Votre message :',
    review_application:
      'Précisez au demandeur les modifications à apporter à sa demande :',
    refuse_application: 'Précisez au demandeur le motif de votre refus :',
    validate_application: 'Vous pouvez ajouter un commentaire (optionnel) :',
  }[selectedAction];

  return (
    <div className="panel comment-section-prompt">
      <label htmlFor="comment">{promptMessage}</label>
      {templates.length > 0 && (
        <select
          value={selectedTemplateIndex}
          onChange={handleTemplateChange}
          disabled={fullEditMode}
        >
          <option value="">Choisir un template</option>
          {templates.map((template, index) => (
            <option key={index} value={index}>
              {template.substring(0, 100)}
            </option>
          ))}
        </select>
      )}
      <div className={`mail-section`}>
        <div className="mail-section-head">
          <div className="mail-section-attributes">
            <b>DE :</b> {senderAddress}
          </div>
          <div className="mail-section-attributes">
            <b>À :</b> {ownerEmailAddress}
          </div>
          <div className="mail-section-attributes">
            <b>SUJET :</b> {subject}
          </div>
        </div>
        {!fullEditMode && (
          <div className="mail-section-content">
            <button
              title="Éditer les sections d'entête et de pied de l'email"
              aria-label="Éditer les sections d'entête et de pied de l'email"
              className="light inline-icon-button toggle-comment-button"
              onClick={switchToFullEditMode}
            >
              Editer <EditIcon color="var(--grey)" size={17} />
            </button>
            {mailHeader}
          </div>
        )}
      </div>
      <div className="text-area-wrapper">
        <textarea
          id="comment"
          cols="80"
          rows={fullEditMode ? '15' : '5'}
          value={input}
          onChange={handleInputChange}
        />
      </div>
      {!fullEditMode && (
        <div className={`mail-section mail-section-opened`}>
          <div className="mail-section-content">{mailFooter}</div>
        </div>
      )}
      <div className="button-list action">
        <button className="button-outline large secondary" onClick={onCancel}>
          Annuler
        </button>
        <button
          className={`button large ${acceptCssClass}`}
          onClick={handleAccept}
        >
          {acceptLabel}
        </button>
      </div>
    </div>
  );
};

Prompt.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  acceptCssClass: PropTypes.string.isRequired,
  acceptLabel: PropTypes.string.isRequired,
  selectedAction: PropTypes.string.isRequired,
  targetApi: PropTypes.string.isRequired,
  ownerEmailAddress: PropTypes.string.isRequired,
};

export default Prompt;
