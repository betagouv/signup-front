import {
  collectionWithKeyToObject,
  getChangelog,
  getTokenUrl,
  hashToQueryParams,
  isValidNAFCode,
  objectToCollectionWithKey,
} from '../utils';

describe('utils', () => {
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

  describe('getTokenUrl', () => {
    it('should return API Particulier URL', () => {
      expect(
        getTokenUrl({
          targetApi: 'api_particulier',
          id: 'abcdef1234567890abcdef12',
        })
      ).toEqual(
        'https://particulier-development.api.gouv.fr/admin/token/abcdef1234567890abcdef12'
      );
    });

    it('should return null for other target API', () => {
      expect(
        getTokenUrl({
          targetApi: 'franceconnect',
          id: 'abcd1234-1234-1234-1234-1234567890ab',
        })
      ).toEqual(null);
    });
  });
});
