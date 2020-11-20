import _, {
  isBoolean,
  isArray,
  isEmpty,
  isInteger,
  isObject,
  isString,
  mapKeys,
  mapValues,
  mergeWith,
  omitBy,
  forOwn,
} from 'lodash';
import flatten from 'flat';

export function getErrorMessages(error) {
  if (!isEmpty(error.response) && isObject(error.response.data)) {
    return _(error.response.data)
      .values()
      .flatten()
      .value();
  }

  const errorMessageEnd =
    'Merci de réessayer ultérieurement. ' +
    'Vous pouvez également nous signaler cette erreur par mail à contact@api.gouv.fr.';

  if (!isEmpty(error.response)) {
    return [
      `Une erreur est survenue. Le code de l'erreur est ${
        error.response.status
      } (${error.response.statusText}). ${errorMessageEnd}`,
    ];
  }

  if (error.message === 'Network Error') {
    return [
      'Une erreur de connection au serveur est survenue. ' +
        'Merci de vérifier que vous êtes bien connecté à internet. ' +
        "Si vous utilisez un réseau d'entreprise, merci de signaler cette erreur à " +
        "l'administrateur de votre réseau informatique. " +
        'Si le problème persiste, vous pouvez nous contacter par mail à ' +
        'contact@api.gouv.fr.',
    ];
  }

  console.error(error);
  return [`Une erreur inconnue est survenue. ${errorMessageEnd}`];
}

const publicServicesNAFCodes = [
  '84', // SERVICES D’ADMINISTRATION PUBLIQUE ET DE DÉFENSE ; SERVICES DE SÉCURITÉ SOCIALE OBLIGATOIRE
  '85', // ENSEIGNEMENT
  '86', // ACTIVITÉS POUR LA SANTÉ HUMAINE
  '88', // Action sociale sans hébergement
];

const validNAFCode = {
  api_particulier: publicServicesNAFCodes,
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

const diffFieldLabels = {
  cgu_approved: "de l'approbation des CGU",
  data_recipients: 'des destinataires des données',
  data_retention_period: 'de la durée de conservation des données',
  data_retention_comment:
    'de la justification de la durée de conservation des données',
  description: 'de la description',
  fondement_juridique_title: 'de la référence du cadre juridique',
  fondement_juridique_url: "de l'url du cadre juridique",
  intitule: "de l'intitulé",
  dpo_label: 'du nom du DPD',
  dpo_id: "de l'identifiant du DPD",
  dpo_phone_number: 'du numéro de téléphone du DPD',
  responsable_traitement_label: 'du nom du responsable de traitement',
  responsable_traitement_id: "de l'identifiant du responsable de traitement",
  responsable_traitement_phone_number:
    'du numéro de téléphone du responsable de traitement',
  'contacts.0.nom': 'du nom du contact 1',
  'contacts.0.email': "de l'email du contact 1",
  'contacts.0.phone_number': 'du numéro de téléphone du contact 1',
  'contacts.1.nom': 'du nom du contact 2',
  'contacts.1.email': "de l'email du contact 2",
  'contacts.1.phone_number': 'du numéro de téléphone du contact 2',
};

function flattenDiffTransformer(accumulatorObject, fullObjectDiff, objectKey) {
  if (!isObject(fullObjectDiff[0])) {
    accumulatorObject[objectKey] = fullObjectDiff;

    return accumulatorObject;
  }
  // {contacts: [[{'name': 'c', email: 'd'}], [{'name': 'e', email: 'd'}]]}
  const objectBefore = flatten(fullObjectDiff[0], objectKey);
  const objectAfter = flatten(fullObjectDiff[1], objectKey);
  const objectDiff = mergeWith(
    objectBefore,
    objectAfter,
    (valueBefore, valueAfter) => [valueBefore, valueAfter]
  );
  // {0.name: ['c', 'e'], 0.email: ['d', 'd']}
  const objectDiffNoUnchanged = omitBy(
    objectDiff,
    value => value[0] === value[1]
  );
  // {0.name: ['c', 'e']}
  const objectDiffPrefixedKey = mapKeys(
    objectDiffNoUnchanged,
    (value, flatKey) => `${objectKey}.${flatKey}`
  );
  // {contacts.0.name: ['c', 'e']}
  Object.assign(accumulatorObject, objectDiffPrefixedKey);

  return accumulatorObject;
}

function changelogFormatTransformer(
  accumulatorArray,
  [valueBefore, valueAfter],
  key
) {
  const label = diffFieldLabels[key] ? diffFieldLabels[key] : 'du champ ' + key;
  const displayedValueBefore = isBoolean(valueBefore)
    ? valueBefore
      ? 'coché'
      : 'décoché'
    : valueBefore;
  const displayedValueAfter = isBoolean(valueAfter)
    ? valueAfter
      ? 'coché'
      : 'décoché'
    : valueAfter;

  accumulatorArray.push(
    `Changement ${label} de "${displayedValueBefore}" en "${displayedValueAfter}".`
  );

  return accumulatorArray;
}

export function getChangelog(diff) {
  try {
    return (
      _(diff)
        // { intitule: ['a', 'b'], contacts: [[{'name': 'c', email: 'd'}], [{'name': 'e', email: 'd'}]] }
        .omit(['updated_at'])
        .transform(flattenDiffTransformer, {})
        // { intitule: ['a', 'b'], contacts.0.name: ['c', 'e'] }
        .transform(changelogFormatTransformer, [])
        // ['changement d'intitule de "a" en "b"', 'changement du nom du DPD de "c" en "d"']
        .value()
    );
  } catch (e) {
    // There is a lot of operation involved in this function.
    // We rather fail silently than causing the entire page not to render.
    console.error(e);
    return [];
  }
}

export function hashToQueryParams(hash) {
  const queryParams = _(hash)
    // { a: 1, b: true, c: false, d: [] }
    .omitBy(e => (isObject(e) ? isEmpty(e) : !e))
    // { a: 1, b: true }
    .toPairs()
    // [[ 'a', 1 ], [ 'b', true ]]
    .map(
      ([key, value]) =>
        `${key}=${encodeURIComponent(
          isObject(value) ? JSON.stringify(value) : value
        )}`
    )
    // [ 'a=1', 'b=true' ]
    .value();

  // '?a=1&b=true'
  return isEmpty(queryParams) ? '' : `?${queryParams.join('&')}`;
}

export function collectionWithKeyToObject(collection) {
  return (
    _(collection)
      // [{ id: 'a', attr1: 'a1', attr2: 'a2' }, { id: 'b', attr1: 'b1', attr2: 'b2' }]
      .map(({ id, ...attributes }) => [id, attributes])
      // [[ 'a', { attr1: 'a1', attr2: 'a2' }], ['b', { attr1: 'b1', attr2: 'b2' }]]
      .fromPairs()
      // { a: { attr1: 'a1', attr2: 'a2' },  b: { attr1: 'b1', attr2: 'b2' }}
      .value()
  );
}

export function objectToCollectionWithKey(object) {
  return (
    _(object)
      // { a: { attr1: 'a1', attr2: 'a2' },  b: { attr1: 'b1', attr2: 'b2' }}
      .toPairs()
      // [[ 'a', { attr1: 'a1', attr2: 'a2' }], ['b', { attr1: 'b1', attr2: 'b2' }]]
      .map(([id, attributes]) => ({ id, ...attributes }))
      // [{ id: 'a', attr1: 'a1', attr2: 'a2' }, { id: 'b', attr1: 'b1', attr2: 'b2' }]
      .value()
  );
}

export function openLink(e, history, targetUrl) {
  if (e.ctrlKey || e.metaKey) {
    // metaKey is cmd on mac
    window.open(targetUrl); // open in new tab
  } else {
    history.push(targetUrl, { fromList: true });
  }
}

export const getStateFromUrlParams = (defaultState = {}) => {
  const urlParams = new URLSearchParams(window.location.search);

  return mapValues(defaultState, (value, key) => {
    if (!urlParams.has(key)) {
      return value;
    }

    const param = urlParams.getAll(key);

    if (isArray(value)) {
      return param.map(itemAsString => {
        const k = itemAsString.split(':')[0];
        const v = itemAsString.split(':')[1];

        if (['asc', 'desc'].includes(v)) {
          return { id: k, desc: v === 'desc' };
        }

        return { id: k, value: v };
      });
    }

    if (isObject(value)) {
      return JSON.parse(param[0]);
    }

    if (isInteger(value)) {
      return parseInt(param[0]) || value;
    }

    if (isBoolean(value)) {
      return param[0] === 'true';
    }

    return param[0];
  });
};

export const setUrlParamsFromState = (newState = {}) => {
  const urlParams = new URLSearchParams(window.location.search);

  forOwn(newState, (value, key) => {
    if (isArray(value)) {
      urlParams.delete(key);

      return value.forEach(({ id: k, value: v, desc }) => {
        if (desc !== undefined) {
          return urlParams.append(key, `${k}:${desc ? 'desc' : 'asc'}`);
        }

        return urlParams.append(key, `${k}:${v}`);
      });
    }

    return urlParams.set(key, value);
  });

  const newQueryString = urlParams.toString();

  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}?${newQueryString}`
  );
};
