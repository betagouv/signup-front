import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Prompt.css';
import UnfoldMoreIcon from '../../icons/unfold-more';
import UnfoldLessIcon from '../../icons/unfold-less';
import EditIcon from '../../icons/edit';
import useMostUsedComments from './useMostUsedComments';
import {
  getMailAttributes,
  getMailFooter,
  getMailHeader,
} from '../../../lib/enrollment-mailer-templates';

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
  const [showHeaderAndFooter, setShowHeaderAndFooter] = useState(false);
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

  const toggleShowTemplates = () => {
    setShowHeaderAndFooter(!showHeaderAndFooter);
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
    setShowHeaderAndFooter(false);
    setFullEditMode(true);
  };

  const promptMessage = {
    notify: 'Votre message\xa0:',
    review_application:
      'Précisez au demandeur les modifications à apporter à sa demande\xa0:',
    refuse_application: 'Précisez au demandeur le motif de votre refus\xa0:',
    validate_application: 'Vous pouvez ajouter un commentaire (optionnel)\xa0:',
  }[selectedAction];

  return (
    <div className="panel">
      {!fullEditMode && (
        <button
          title={
            showHeaderAndFooter
              ? "Cacher l'aperçu"
              : "Voir un aperçu de l'email qui sera envoyé"
          }
          aria-label={
            showHeaderAndFooter
              ? "Cacher l'aperçu"
              : "Voir un aperçu de l'email qui sera envoyé"
          }
          className="light inline-icon-button toggle-comment-button"
          onClick={toggleShowTemplates}
        >
          {showHeaderAndFooter ? (
            <UnfoldLessIcon color="var(--grey)" />
          ) : (
            <UnfoldMoreIcon color="var(--grey)" />
          )}
        </button>
      )}
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
      <div
        className={`mail-section ${
          showHeaderAndFooter || fullEditMode ? 'mail-section-opened' : ''
        }`}
      >
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
              <EditIcon color="var(--grey)" size={17} />
            </button>
            {mailHeader}
          </div>
        )}
      </div>
      <textarea
        id="comment"
        cols="80"
        rows={fullEditMode ? '15' : '5'}
        value={input}
        onChange={handleInputChange}
      />
      {!fullEditMode && (
        <div
          className={`mail-section ${
            showHeaderAndFooter ? 'mail-section-opened' : ''
          }`}
        >
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
