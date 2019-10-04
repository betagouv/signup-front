import React from 'react';
import PropTypes from 'prop-types';
import { ScrollablePanel } from '../elements/Scrollable';

const DescriptionSection = ({
  disabled = false,
  onChange = () => null,
  enrollment: { intitule = '', description = '' },
}) => (
  <ScrollablePanel scrollableId="description">
    <h2>Description de votre cas d'usage</h2>
    <div className="text-quote">
      <p>
        Décrivez brièvement la raison pour laquelle vous collectez des données à
        caractère personnel, c'est-à-dire l&apos;objectif qui est est poursuivi
        par le traitement que vous mettez en place.
      </p>
    </div>
    <br />
    <div className="form__group">
      <label htmlFor="intitule">Intitulé</label>
      <input
        type="text"
        onChange={onChange}
        name="intitule"
        id="intitule"
        placeholder="« Se connecter au portail famille de ma ville »"
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
        placeholder="« Permettre de faciliter la connexion au portail famille de ma ville sans demander de document papier aux usagés »"
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
