import _, { isEmpty, isObject, isString } from 'lodash';

export function getErrorMessages(error) {
  if (
    !isEmpty(error.response) &&
    isObject(error.response.data) &&
    error.response.status === 422
  ) {
    return _(error.response.data)
      .values()
      .flatten()
      .value();
  }

  if (!isEmpty(error.response) && isObject(error.response.data)) {
    return _(error.response.data)
      .values()
      .flatten()
      .value();
  }

  const errorMessageEnd =
    'Merci de réessayer ultérieurement. ' +
    'Vous pouvez également nous signaler cette erreur par mail à contact@particulier.api.gouv.fr.';

  if (!isEmpty(error.response)) {
    return [
      `Une erreur est survenue. Le code de l'erreur est ${
        error.response.status
      } (${error.response.statusText}). ${errorMessageEnd}`,
    ];
  }

  console.error(error);
  return [`Une erreur inconnue est survenue. ${errorMessageEnd}`];
}

const validNAFCode = {
  'api-particulier': [
    '84', // SERVICES D’ADMINISTRATION PUBLIQUE ET DE DÉFENSE ; SERVICES DE SÉCURITÉ SOCIALE OBLIGATOIRE
    '85', // ENSEIGNEMENT
    '86', // ACTIVITÉS POUR LA SANTÉ HUMAINE
  ],
};

export function isValidNAFCode(provider, NAFcode) {
  if (!isString(NAFcode)) {
    return false;
  }

  if (isEmpty(validNAFCode[provider])) {
    return true;
  }

  if (!validNAFCode[provider].includes(NAFcode.substring(0, 2))) {
    return false;
  }

  return true;
}
