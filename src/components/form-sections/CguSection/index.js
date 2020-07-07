import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../Form';

const Index = ({
  CguDescription = () => null,
  cguLink,
  AdditionalCguContent = () => null,
}) => {
  const {
    disabled,
    onChange,
    enrollment: { cgu_approved = false, additional_content = {} },
  } = useContext(FormContext);

  return (
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
            conditions générales d'utilisation
          </a>{' '}
          et je les valide. Je confirme que le DPD de mon organisation est
          informé de ma demande.
        </label>
      </div>

      <AdditionalCguContent
        additional_content={additional_content}
        onChange={onChange}
        disabled={disabled}
      />
    </ScrollablePanel>
  );
};

Index.propTypes = {
  CguDescription: PropTypes.func,
  cguLink: PropTypes.string.isRequired,
  AdditionalCguContent: PropTypes.func,
};

export default Index;
