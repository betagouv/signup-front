import React from 'react';
import PropTypes from 'prop-types';

const FcHasAlternativeAuthenticationMethod = ({
  disabled,
  onChange,
  enrollment: {
    donnees: { has_alternative_authentication_methods },
  },
}) => (
  <div className="form__group">
    <input
      onChange={onChange}
      disabled={disabled ? 'disabled' : false}
      checked={has_alternative_authentication_methods}
      type="checkbox"
      name="donnees.has_alternative_authentication_methods"
      id="has_alternative_authentication_methods"
    />
    <label
      htmlFor="has_alternative_authentication_methods"
      className="label-inline"
    >
      J’atteste que mon service propose une alternative à la connection avec
      FranceConnect, et que cette alternative permet l’accès, dans des
      conditions analogues, à la même prestation de service public.
    </label>
  </div>
);

FcHasAlternativeAuthenticationMethod.propTypes = {
  enrollment: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default FcHasAlternativeAuthenticationMethod;
