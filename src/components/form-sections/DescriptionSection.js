import React, { useContext } from 'react';
import { ScrollablePanel } from '../elements/Scrollable';
import Helper from '../elements/Helper';
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
      <h2>Description de votre cas d'usage</h2>
      <div className="text-quote">
        <p>
          Décrivez la raison pour laquelle vous collectez des données à
          caractère personnel, c'est-à-dire l’objectif qui est est poursuivi par
          le traitement que vous mettez en place.
        </p>
      </div>
      <br />
      <div className="form__group">
        <label htmlFor="intitule">
          Nom de la démarche
          <Helper title="Il doit permettre de faciliter l’identification de votre démarche. Cette information pouvant être rendue publique, il convient d'être synthétique et précis." />
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
        <label htmlFor="intitule">Description détaillée</label>
        <textarea
          rows="10"
          onChange={onChange}
          name="description"
          id="description"
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
