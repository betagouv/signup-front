import React from 'react';
import PropTypes from 'prop-types';

const FcHasAlternativeAuthenticationMethod = ({
  disabled,
  onChange,
  additional_content: { has_alternative_authentication_methods = false },
}) => (
  <div className="form__group">
    <input
      onChange={onChange}
      disabled={disabled ? 'disabled' : false}
      checked={has_alternative_authentication_methods}
      type="checkbox"
      name="additional_content.has_alternative_authentication_methods"
      id="has_alternative_authentication_methods"
    />
    <label
      htmlFor="has_alternative_authentication_methods"
      className="label-inline"
    >
      J’atteste que mon service propose une alternative à la connexion avec
      FranceConnect, et que cette alternative permet l’accès, dans des
      conditions analogues, à la même prestation de service public.
    </label>
  </div>
);

FcHasAlternativeAuthenticationMethod.propTypes = {
  additional_content: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default FcHasAlternativeAuthenticationMethod;
