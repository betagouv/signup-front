import React from 'react';
import PropTypes from 'prop-types';
import { ScrollablePanel } from '../elements/Scrollable';
import Helper from '../elements/Helper';

const DescriptionSection = ({
  disabled = false,
  onChange = () => null,
  enrollment: { intitule = '', description = '' },
}) => (
  <ScrollablePanel scrollableId="description">
    <h2>Description de votre cas d'usage</h2>
    <div className="form__group">
      <label htmlFor="intitule">
        Nom du service
        <Helper title="Il doit permettre de faciliter l’identification de votre service auprès du fournisseur de données" />
      </label>
      <input
        type="text"
        onChange={onChange}
        name="intitule"
        id="intitule"
        readOnly={disabled}
        value={intitule}
      />
      <small className="card__meta">
        <i>Cette information peut être rendue publique.</i>
      </small>
    </div>
    <div className="form__group">
      <label htmlFor="description">
        Décrivez brièvement la raison pour laquelle vous collectez des données à
        caractère personnel, c'est-à-dire l&apos;objectif qui est poursuivi par
        le traitement que vous mettez en place.
      </label>
      <textarea
        rows="10"
        onChange={onChange}
        name="description"
        id="description"
        readOnly={disabled}
        value={description}
        placeholder="« se connecter au portail famille de ma ville », « accèder à son compte personnel de mutuelle », etc."
      />
    </div>
  </ScrollablePanel>
);

DescriptionSection.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    intitule: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default DescriptionSection;
