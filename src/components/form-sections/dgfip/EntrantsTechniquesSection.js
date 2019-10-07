import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollablePanel } from '../../elements/Scrollable';
import { FormContext } from '../../Form';

const EntrantsTechniquesSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: { ips_de_production = '' },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="entrants-techniques">
      <h2>Entrants techniques</h2>
      <div className="text-quote">
        <p>
          Afin de permettre la liaison technique entre votre SI et celui de la
          DGFiP, vous devez fournir les adresses IP des serveurs qui vont
          communiquer avec l'API Impôt particulier.
        </p>
        <p>
          Afin de permettre votre mise en production dans les meilleures
          conditions possibles, veuillez vous assurer de la qualité de ces
          livrables techniques.
        </p>
      </div>
      <br />

      <div className="form__group">
        <label htmlFor="ips_de_production">IPs de production</label>
        <input
          type="text"
          onChange={onChange}
          name="additional_content.ips_de_production"
          id="ips_de_production"
          readOnly={disabled}
          value={ips_de_production}
        />
        <small className="card__meta">
          Vous pouvez ajouter plusieurs adresses IP en les séparant par une
          virgule (ex: 111.111.11.11, 111.111.11.12)
        </small>
      </div>
    </ScrollablePanel>
  );
};

EntrantsTechniquesSection.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    additional_content: PropTypes.object,
  }),
};

export default EntrantsTechniquesSection;
