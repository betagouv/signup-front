import React from 'react';
import PropTypes from 'prop-types';
import { ScrollablePanel } from '../elements/Scrollable';

const CguSection = ({
  CguDescription = () => null,
  cguLink,
  AdditionalCguContent = () => null,
  disabled = false,
  onChange = () => null,
  enrollment: { cgu_approved = false, additional_content = {} },
}) => (
  <ScrollablePanel scrollableId="cgu">
    <h2>Modalités d’utilisation</h2>
    <CguDescription />
    <br />
    <div className="form__group">
      <input
        onChange={onChange}
        disabled={disabled ? 'disabled' : false}
        checked={cgu_approved}
        type="checkbox"
        name="cgu_approved"
        id="cgu_approved"
      />
      <label htmlFor="cgu_approved" className="label-inline">
        J'ai pris connaissance des{' '}
        <a href={cguLink} target="_blank" rel="noreferrer noopener">
          modalités d’utilisation
        </a>{' '}
        et je les valide. Je confirme que le délégué à la protection des données
        de mon organisation est informé de ma demande.
      </label>
    </div>

    <AdditionalCguContent
      additional_content={additional_content}
      onChange={onChange}
      disabled={disabled}
    />
  </ScrollablePanel>
);

CguSection.propTypes = {
  CguDescription: PropTypes.func,
  cguLink: PropTypes.string.isRequired,
  AdditionalCguContent: PropTypes.func,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    cgu_approved: PropTypes.bool,
    additional_content: PropTypes.object,
  }),
};

export default CguSection;
