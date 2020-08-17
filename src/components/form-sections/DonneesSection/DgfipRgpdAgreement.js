import React from 'react';
import PropTypes from 'prop-types';

const DgfipRgpdAgreement = ({
  disabled,
  onChange,
  additional_content: { rgpd_general_agreement = false },
}) => (
  <div className="information-text form__group">
    <p>
      <b>
        <input
          onChange={onChange}
          disabled={disabled ? 'disabled' : false}
          checked={rgpd_general_agreement}
          type="checkbox"
          name="additional_content.rgpd_general_agreement"
          id="rgpd_general_agreement"
        />
        <label className="label-inline" htmlFor="rgpd_general_agreement">
          J'atteste que mon organisation devra déclarer à la DGFiP
          l'accomplissement des formalités en matière de protection des données
          à caractère personnel et qu'elle veillera à procéder à l'homologation
          de sécurité de son service.
        </label>
      </b>
    </p>
  </div>
);

DgfipRgpdAgreement.propTypes = {
  additional_content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default DgfipRgpdAgreement;
