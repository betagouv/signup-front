import React from 'react';
import Quote from '../../components/atoms/inputs/Quote';

export const additionalTermsOfUse = [
  {
    id: 'rgpd_general_agreement',
    label: (
      <>
        J’atteste que mon organisation devra déclarer à la DGFiP
        l’accomplissement des formalités en matière de protection des données à
        caractère personnel et qu’elle veillera à procéder à l’homologation de
        sécurité de son projet.
      </>
    ),
  },
];

export const PreviousEnrollmentDescription = () => (
  <Quote>
    <p>
      Vous devez tout d’abord sélectionner la démarche que vous souhaitez
      poursuivre.
    </p>
  </Quote>
);
