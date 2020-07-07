import React, { useContext } from 'react';
import { ScrollablePanel } from '../Scrollable';
import Helper from '../Helper';
import { FormContext } from '../Form';
import PropTypes from 'prop-types';

const DescriptionSection = ({
  intitulePlaceholder = '',
  descriptionPlaceholder = '',
}) => {
  const {
    disabled,
    onChange,
    enrollment: { intitule = '', description = '' },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="description">
      <h2>Description de votre service</h2>
      <div className="text-quote">
        <p>
          Décrivez la raison pour laquelle vous collectez des données à
          caractère personnel en précisant l’objectif du traitement que vous
          mettez en place.
        </p>
      </div>
      <br />
      <div className="form__group">
        <label htmlFor="intitule">
          Nom du service
          <Helper title="Il doit permettre de faciliter l’identification de votre service. Cette information pouvant être rendue publique, il convient d'être synthétique et précis." />
        </label>
        <input
          type="text"
          onChange={onChange}
          name="intitule"
          id="intitule"
          placeholder={intitulePlaceholder}
          readOnly={disabled}
          value={intitule}
        />
        <small className="card__meta">
          <i>Cette information peut être rendue publique.</i>
        </small>
      </div>
      <div className="form__group">
        <label htmlFor="detailed-description">Description détaillée</label>
        <textarea
          rows="10"
          onChange={onChange}
          name="description"
          id="detailed-description"
          readOnly={disabled}
          value={description}
          placeholder={descriptionPlaceholder}
        />
      </div>
    </ScrollablePanel>
  );
};

DescriptionSection.propTypes = {
  intitulePlaceholder: PropTypes.string,
  descriptionPlaceholder: PropTypes.string,
};

export default DescriptionSection;
