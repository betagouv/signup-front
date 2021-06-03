import { ReactElement } from 'react';
import DoneIcon from '../components/atoms/icons/done';

export enum EnrollmentAction {
  notify = 'notify',
  destroy = 'destroy',
  update = 'update',
  send_application = 'send_application',
  refuse_application = 'refuse_application',
  review_application = 'review_application',
  validate_application = 'validate_application',
}

export type ActionConfiguration = {
  displayProps: {
    label: string;
    cssClass: string;
    icon?: ReactElement;
  };
  needsToComputeNextEnrollmentState?: boolean;
  promptForComment?: boolean;
};

export const userInteractionsConfiguration: {
  [key in EnrollmentAction]: ActionConfiguration;
} = {
  notify: {
    displayProps: {
      label: 'Envoyer un message',
      cssClass: 'secondary',
    },
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
  destroy: {
    displayProps: {
      label: 'Supprimer la demande',
      cssClass: 'warning',
    },
  },
  update: {
    displayProps: {
      label: 'Sauvegarder le brouillon',
      cssClass: 'secondary',
    },
  },
  send_application: {
    displayProps: {
      label: 'Soumettre la demande',
      icon: <DoneIcon color="white" />,
      cssClass: 'primary',
    },
    needsToComputeNextEnrollmentState: true,
  },
  refuse_application: {
    displayProps: {
      label: 'Refuser',
      cssClass: 'warning',
    },
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
  review_application: {
    displayProps: {
      label: 'Demander une modification',
      cssClass: 'secondary',
    },
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
  validate_application: {
    displayProps: {
      label: 'Valider',
      cssClass: 'primary',
    },
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
};
