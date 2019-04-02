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
          J'atteste respecter les principes fondamentaux de la protection des
          données et avoir réalisé l'étude d'impact associée avant la mise en
          production de mon téléservice, conformément au règlement général sur
          la protection des données (RGPD) en vigueur depuis le 25 mai 2018.
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
