import {
  collectionWithKeyToObject,
  findModifiedFields,
  getChangelog,
  getErrorMessages,
  getStateFromUrlParams,
  hashToQueryParams,
  isValidNAFCode,
  objectToCollectionWithKey,
} from './index';

describe('utils', () => {
  describe('getErrorMessages', () => {
    it('should return proper error message for error from nginx', () => {
      const errorObject = {
        response: {
          data:
            '<html>\r\n<head><title>502 Bad Gateway</title></head>\r\n<body bgcolor="white">\r\n<center><h1>502 Bad Gateway</h1></center>\r\n<hr><center>nginx/1.10.3 (Ubuntu)</center>\r\n</body>\r\n</html>\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n',
          status: 502,
          statusText: 'Bad Gateway',
        },
      };

      expect(getErrorMessages(errorObject)).toEqual([
        "Une erreur est survenue. Le code de l'erreur est 502 (Bad Gateway). Merci de réessayer ultérieurement. Vous pouvez également nous signaler cette erreur par mail à contact@api.gouv.fr.",
      ]);
    });

    it('should return proper error message for 422 error from backend', () => {
      const errorObject = {
        response: {
          data: {
            description: [
              'Vous devez renseigner la description de la démarche avant de continuer',
            ],
            contacts: [
              'Vous devez renseigner un prénom pour le contact technique avant de continuer',
              'Vous devez renseigner un nom pour le contact technique avant de continuer',
            ],
          },
          status: 422,
          statusText: 'Unprocessable Entity',
        },
      };

      expect(getErrorMessages(errorObject)).toEqual([
        'Vous devez renseigner la description de la démarche avant de continuer',
        'Vous devez renseigner un prénom pour le contact technique avant de continuer',
        'Vous devez renseigner un nom pour le contact technique avant de continuer',
      ]);
    });

    it('should return proper message for network error', () => {
      const errorObject = {
        message: 'Network Error',
      };

      expect(getErrorMessages(errorObject)).toEqual([
        "Une erreur de connection au serveur est survenue. Merci de vérifier que vous êtes bien connecté à internet. Si vous utilisez un réseau d'entreprise, merci de signaler cette erreur à l'administrateur de votre réseau informatique. Si le problème persiste, vous pouvez nous contacter par mail à contact@api.gouv.fr.",
      ]);
    });

    it('should return proper error message for copying error from backend', () => {
      const errorObject = {
        response: {
          data: {
            message:
              "La validation a échoué : Copied from enrollment n'est pas disponible",
          },
          status: 422,
          statusText: 'Unprocessable Entity',
        },
      };

      expect(getErrorMessages(errorObject)).toEqual([
        "La validation a échoué : Copied from enrollment n'est pas disponible",
      ]);
    });

    it('should return proper error message for 403 error from backend', () => {
      const errorObject = {
        response: {
          data: {
            message: "Vous n'êtes pas autorisé à modifier cette ressource",
          },
          status: 403,
          statusText: 'Forbidden',
        },
      };

      expect(getErrorMessages(errorObject)).toEqual([
        "Vous n'êtes pas autorisé à modifier cette ressource",
      ]);
    });

    it('should return proper error message for 401 error from backend', () => {
      const errorObject = {
        response: {
          data: {
            message:
              'Vous devez vous connecter ou vous inscrire pour continuer.',
          },
          status: 401,
          statusText: 'Unauthorized',
        },
      };

      expect(getErrorMessages(errorObject)).toEqual([
        'Vous devez vous connecter ou vous inscrire pour continuer.',
      ]);
    });
  });

  describe('isValidNAFCode', () => {
    it('should return true for COMMUNE D HEM', () => {
      expect(isValidNAFCode('api_particulier', '8411Z')).toBe(true);
    });
    it('should return true for ASSISTANCE PUBLIQUE HOPITAUX DE PARIS', () => {
      expect(isValidNAFCode('api_particulier', '8610Z')).toBe(true);
    });
    it('should return false for RED NEEDLES', () => {
      expect(isValidNAFCode('api_particulier', '6202A')).toBe(false);
    });
    it('should return true if provider does not filter on NAF code', () => {
      expect(isValidNAFCode('dgfip', '6202A')).toBe(true);
    });
  });

  describe('getChangelog', () => {
    const diff = {
      data_retention_period: [12, 11],
      fondement_juridique_title: [
        'Convention d\'accès à "Mon compte partenaire" - Ville de Hem / CAF du Nord - Contrat de service pris en application de la convention d\'accès à "Mon Compte Partenaire" (mode gestion déléguée) signés le 11 mai 2017.',
        'Convention d\'accès à "Mon compte partenaire" - Ville de Hem / CAF du Nord - Contrat de service pris en application de la convention d\'accès à "Mon Compte Partenaire" (mode gestion déléguée) signés le 11 mai 2017',
      ],
      updated_at: ['2019-05-13T16:35:19.742Z', '2019-05-14T09:30:54.304Z'],
      contacts: [
        [
          {
            email: 'raphael.dubigny@beta.gouv.fr',
            heading: 'Délégué à la protection des données',
            id: 'dpo',
            nom: 'Raphaël Dubigny2',
            phone_number: '0123456789',
          },
          {
            email: 'raphael.dubigny@beta.gouv.fr',
            heading: 'Responsable de traitement',
            id: 'responsable_traitement',
            nom: 'Raphaël Dubigny',
            phone_number: '0123456789',
          },
          {
            email: 'raphael.dubigny@beta.gouv.fr',
            heading: 'Responsable technique',
            id: 'technique',
            nom: 'Raphaël Dubigny',
            phone_number: '0123456789',
          },
        ],
        [
          {
            email: 'raphael.dubigny@beta.gouv.fr',
            heading: 'Délégué à la protection des données',
            id: 'dpo',
            nom: 'Raphaël Dubigny',
            phone_number: '0123456789',
          },
          {
            email: 'raphael.dubigny@beta.gouv.fr',
            heading: 'Responsable de traitement',
            id: 'responsable_traitement',
            nom: 'Raphaël Dubigny',
            phone_number: '0123456789',
          },
          {
            email: 'raphael.dubigny@beta.gouv.fr',
            heading: 'Responsable technique',
            id: 'technique',
            nom: 'Raphaël Dubigny',
            phone_number: '0123456789',
          },
        ],
      ],
      scopes: [
        {
          birthcountry: true,
          birthdate: false,
          birthplace: true,
          email: true,
          family_name: true,
          gender: false,
          given_name: true,
          openid: true,
        },
        {
          birthcountry: false,
          birthdate: true,
          birthplace: true,
          email: true,
          family_name: true,
          gender: false,
          given_name: true,
          openid: true,
        },
      ],
    };

    const changelog = [
      'Changement de la durée de conservation des données de "12" en "11".',
      'Changement de la référence du cadre juridique de "Convention d\'accès à "Mon compte ' +
        'partenaire" - Ville de Hem / CAF du Nord - Contrat de service pris en application de la ' +
        'convention d\'accès à "Mon Compte Partenaire" (mode gestion déléguée) signés le 11 mai ' +
        '2017." en "Convention d\'accès à "Mon compte partenaire" - Ville de Hem / CAF du Nord - ' +
        'Contrat de service pris en application de la convention d\'accès à "Mon Compte ' +
        'Partenaire" (mode gestion déléguée) signés le 11 mai 2017".',
      'Changement du nom du contact 1 de "Raphaël Dubigny2" en "Raphaël Dubigny".',
      'Changement du champ scopes.birthcountry de "coché" en "décoché".',
      'Changement du champ scopes.birthdate de "décoché" en "coché".',
    ];

    it('should return changelog for simple string field', () => {
      expect(getChangelog(diff)[0]).toEqual(changelog[0]);
    });
    it('should return changelog for several simple field', () => {
      expect(getChangelog(diff)[1]).toEqual(changelog[1]);
    });
    it('should return changelog for contact field', () => {
      expect(getChangelog(diff)[2]).toEqual(changelog[2]);
    });
    it('should return changelog for scopes', () => {
      expect(getChangelog(diff)).toEqual(changelog);
    });
  });

  describe('hashToQueryParams', () => {
    it('should return a query params string', () => {
      expect(hashToQueryParams({ a: 1, b: true, c: false, d: [] })).toBe(
        '?a=1&b=true'
      );
    });

    it('should return a query params string with one argument', () => {
      expect(hashToQueryParams({ a: 1 })).toBe('?a=1');
    });

    it('should return an empty query params string', () => {
      expect(hashToQueryParams({})).toBe('');
    });

    it('should return an empty query params string', () => {
      expect(hashToQueryParams(null)).toBe('');
    });

    it('should return an serialized json object', () => {
      expect(hashToQueryParams({ o: [{ id: 'a', value: 'b' }] })).toBe(
        '?o=%5B%7B%22id%22%3A%22a%22%2C%22value%22%3A%22b%22%7D%5D'
      );
    });

    it('should return an serialized json object', () => {
      const state = {
        fondement_juridique_title: 'Article L114-8 du CRPA',
        fondement_juridique_url:
          'https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000033219997&cidTexte=LEGITEXT000031366350&dateTexte=20161009',
        scopes: {
          cnaf_adresse: true,
          cnaf_allocataires: true,
          cnaf_enfants: true,
          cnaf_quotient_familial: true,
          dgfip_adresse: true,
          dgfip_avis_imposition: true,
        },
      };

      expect(hashToQueryParams(state)).toBe(
        '?fondement_juridique_title=Article%20L114-8%20du%20CRPA' +
          '&fondement_juridique_url=https%3A%2F%2Fwww.legifrance.gouv.fr%2FaffichCodeArticle.do%3FidArticle%3DLEGIARTI000033219997%26cidTexte%3DLEGITEXT000031366350%26dateTexte%3D20161009' +
          '&scopes=%7B%22cnaf_adresse%22%3Atrue%2C%22cnaf_allocataires%22%3Atrue%2C%22cnaf_enfants%22%3Atrue%2C%22cnaf_quotient_familial%22%3Atrue%2C%22dgfip_adresse%22%3Atrue%2C%22dgfip_avis_imposition%22%3Atrue%7D'
      );
    });
  });

  describe('collectionWithKeyToObject', () => {
    it('should return empty object for empty array', () => {
      expect(collectionWithKeyToObject([])).toStrictEqual({});
    });

    it('should return empty object for undefined', () => {
      expect(collectionWithKeyToObject(undefined)).toStrictEqual({});
    });

    it('should turn collection with key into object', () => {
      const collectionWithKey = [
        { id: 'a', attr1: 'a1', attr2: 'a2' },
        { id: 'b', attr1: 'b1', attr2: 'b2' },
      ];
      expect(collectionWithKeyToObject(collectionWithKey)).toStrictEqual({
        a: { attr1: 'a1', attr2: 'a2' },
        b: { attr1: 'b1', attr2: 'b2' },
      });
    });
  });

  describe('collectionWithKeyToObject', () => {
    it('should return empty object for empty array', () => {
      expect(objectToCollectionWithKey({})).toStrictEqual([]);
    });

    it('should return empty object for undefined', () => {
      expect(objectToCollectionWithKey(undefined)).toStrictEqual([]);
    });

    it('should turn collection with key into object', () => {
      const object = {
        a: { attr1: 'a1', attr2: 'a2' },
        b: { attr1: 'b1', attr2: 'b2' },
      };
      expect(objectToCollectionWithKey(object)).toStrictEqual([
        { id: 'a', attr1: 'a1', attr2: 'a2' },
        { id: 'b', attr1: 'b1', attr2: 'b2' },
      ]);
    });

    it('should be inverse of collectionWithKeyToObject', () => {
      expect(
        objectToCollectionWithKey(collectionWithKeyToObject([]))
      ).toStrictEqual([]);
    });

    it('should return array even for unexpected undefined in input', () => {
      expect(
        objectToCollectionWithKey(collectionWithKeyToObject(undefined))
      ).toStrictEqual([]);
    });

    it('should be inverse of collectionWithKeyToObject', () => {
      const collectionWithKey = [
        { id: 'a', attr1: 'a1', attr2: 'a2' },
        { id: 'b', attr1: 'b1', attr2: 'b2' },
      ];
      expect(
        objectToCollectionWithKey(collectionWithKeyToObject(collectionWithKey))
      ).toStrictEqual(collectionWithKey);
    });
  });

  describe('getStateFromUrlParams', () => {
    let location = null;

    beforeEach(() => {
      location = global.window.location;
      delete global.window.location;
      global.window = Object.create(window);
      global.window.location = {
        protocol: 'http:',
        hostname: 'localhost',
      };
    });

    afterEach(() => {
      global.window.location = location;
      location = null;
    });

    it('should return a hash from filtered enrollment list url', () => {
      global.window.location.search =
        '?page=0' +
        '&sorted=updated_at%3Adesc' +
        '&filtered=nom_raison_sociale%3Ate' +
        '&filtered=user.email%3Afrance' +
        '&filtered=target_api%3Afranceconnect';

      const expectedResult = {
        page: 0,
        sorted: [{ id: 'updated_at', desc: true }],
        filtered: [
          { id: 'nom_raison_sociale', value: 'te' },
          { id: 'user.email', value: 'france' },
          { id: 'target_api', value: 'franceconnect' },
        ],
      };

      expect(
        getStateFromUrlParams({ page: 0, sorted: [], filtered: [] })
      ).toEqual(expectedResult);
    });

    it('should ignore null value', () => {
      global.window.location.search = '?a=&b&d=1';

      const expectedResult = { a: '', b: '', c: '' };

      expect(getStateFromUrlParams({ a: '', b: '', c: '' })).toEqual(
        expectedResult
      );
    });

    it('should process boolean value', () => {
      global.window.location.search = '?a=true&b=false';

      const expectedResult = { a: true, b: false, c: false };

      expect(getStateFromUrlParams({ a: false, b: true, c: false })).toEqual(
        expectedResult
      );
    });

    it('should return a hash from preset enrollment form url', () => {
      global.window.location.search =
        '?fondement_juridique_title=Article%20L114-8%20du%20CRPA' +
        '&fondement_juridique_url=https%3A%2F%2Fwww.legifrance.gouv.fr%2FaffichCodeArticle.do%3FidArticle%3DLEGIARTI000033219997%26cidTexte%3DLEGITEXT000031366350%26dateTexte%3D20161009' +
        '&scopes=%7B%22cnaf_adresse%22%3Atrue%2C%22cnaf_allocataires%22%3Atrue%2C%22cnaf_enfants%22%3Atrue%2C%22cnaf_quotient_familial%22%3Atrue%2C%22dgfip_adresse%22%3Atrue%2C%22dgfip_avis_imposition%22%3Atrue%7D';

      const expectedResult = {
        fondement_juridique_title: 'Article L114-8 du CRPA',
        fondement_juridique_url:
          'https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000033219997&cidTexte=LEGITEXT000031366350&dateTexte=20161009',
        scopes: {
          cnaf_adresse: true,
          cnaf_allocataires: true,
          cnaf_enfants: true,
          cnaf_quotient_familial: true,
          dgfip_adresse: true,
          dgfip_avis_imposition: true,
        },
      };

      expect(
        getStateFromUrlParams({
          fondement_juridique_title: '',
          fondement_juridique_url: '',
          scopes: {},
        })
      ).toEqual(expectedResult);
    });
  });

  describe('findModifiedFieldsInEnrollment', () => {
    it('should return an array with modified field(s)', () => {
      expect(
        findModifiedFields(
          {
            data_recipients: '',
            data_retention_period: '',
            description: '',
            fondement_juridique_title: '',
            fondement_juridique_url: '',
            intitule: '',
            scopes: {
              cnaf_adresse: false,
              cnaf_allocataires: true,
              cnaf_enfants: true,
              cnaf_quotient_familial: true,
              dgfip_adresse: true,
              dgfip_avis_imposition: true,
            },
          },
          {
            acl: {
              send_application: true,
              update: true,
              additional_content: {},
            },
            contacts: {
              metier: {
                heading: 'Contact métier',
                email: '',
                phone_number: '',
              },
              technique: {
                heading: 'Responsable technique',
                email: '',
                phone_number: '',
              },
            },
            data_recipients: '',
            data_retention_period: '',
            demarche: 'ccas',
            description: '',
            events: [],
            fondement_juridique_title: '',
            fondement_juridique_url: '',
            intitule: 'wxcxcw',
            organization_id: 1,
            scopes: {
              cnaf_adresse: false,
              cnaf_allocataires: true,
              cnaf_enfants: true,
              cnaf_quotient_familial: true,
              dgfip_adresse: true,
              dgfip_avis_imposition: true,
            },
            siret: '21920023500014',
            target_api: 'api_particulier',
          }
        )
      ).toStrictEqual(['intitule']);
    });
  });
});
