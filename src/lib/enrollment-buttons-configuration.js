import DoneIcon from '../components/atoms/icons/done';

export const userInteractionsConfiguration = {
  notify: {
    label: 'Envoyer un message',
    cssClass: 'secondary',
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
  destroy: {
    label: 'Supprimer la demande',
    cssClass: 'warning',
  },
  update: {
    label: 'Sauvegarder le brouillon',
    cssClass: 'secondary',
  },
  send_application: {
    label: 'Soumettre la demande',
    icon: <DoneIcon color="white" />,
    cssClass: 'primary',
    needsToComputeNextEnrollmentState: true,
  },
  refuse_application: {
    label: 'Refuser',
    cssClass: 'warning',
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
  review_application: {
    label: 'Demander une modification',
    cssClass: 'secondary',
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
  validate_application: {
    label: 'Valider',
    cssClass: 'primary',
    needsToComputeNextEnrollmentState: true,
    promptForComment: true,
  },
};
