import React, { useContext, useEffect } from 'react';

import { ScrollablePanel } from '../Scrollable';
import { FormContext } from '../Form';
import OpenInNewIcon from '../icons/open-in-new';
import CheckboxInput from '../Form/components/CheckboxInput';

export const FranceConnectPlusSection = () => {
  const {
    isUserEnrollmentLoading,
    disabled,
    onChange,
    enrollment: {
      additional_content: { eidas_1 = '', eidas_2 = '' },
    },
  } = useContext(FormContext);

  useEffect(() => {
    if (!isUserEnrollmentLoading && !disabled && eidas_1 === '') {
      onChange({
        target: {
          name: 'additional_content.eidas_1',
          value: true,
        },
      });
    }
  }, [isUserEnrollmentLoading, disabled]);

  return (
    <ScrollablePanel scrollableId="niveau-eidas">
      <h2>Le niveau de garantie attendu par votre service</h2>
      <CheckboxInput
        label="FranceConnect : niveau de garantie eIDAS 1"
        helper="Niveau par défaut, recommandé si vous n'avez pas d’exigence particulière sur le niveau eIDAS"
        name="additional_content.eidas_1"
        value={eidas_1}
        disabled={disabled}
        onChange={onChange}
      />
      <CheckboxInput
        label={
          <>
            FranceConnect+ : niveau de garantie eIDAS 2{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Aller vers le règlement eIDAS`}
              href={
                'https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32015R1502&from=FR'
              }
            >
              <OpenInNewIcon color={'var(--theme-primary)'} size={14} />
            </a>
          </>
        }
        name="additional_content.eidas_2"
        value={eidas_2}
        disabled={disabled}
        onChange={onChange}
      />
    </ScrollablePanel>
  );
};

export default FranceConnectPlusSection;
