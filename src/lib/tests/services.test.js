import nock from 'nock';
import {
  getUserEnrollments,
  getResourceProviderService,
  getUserEnrollment,
  serializeEnrollment,
} from '../../lib/services';
import FIRST_ENROLLMENT_1 from '../../../mock/enrollment-form/first-form-enrollment';
import ENROLLMENTS from '../../../mock/api/get-user-enrollments-response';
import RESOURCE_PROVIDERS from '../../../mock/data/resource-providers';
import SENT_ENROLLMENT from '../../../mock/enrollment-form/sent-enrollment';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

describe('getUserEnrollments', () => {
  describe('When there is a response', () => {
    nock(BACK_HOST, {
      reqheaders: {
        Authorization: '',
        'Content-Type': 'application/json',
      },
    })
      .get('/api/enrollments/')
      .reply(200, ENROLLMENTS);
    it('should return the data', () => {
      return getUserEnrollments().then(response => {
        expect(response).toEqual(ENROLLMENTS);
      });
    });
  });
});

describe('getResourceProviderService', () => {
  describe('When the user is authorized', () => {
    nock(BACK_HOST)
      .get('/api/resource_providers')
      .reply(200, RESOURCE_PROVIDERS, { 'content-type': 'application/json' });

    it('should return a 200 code', () => {
      return getResourceProviderService().then(response => {
        expect(response).toEqual(RESOURCE_PROVIDERS);
      });
    });
  });
});

describe('getUserEnrollment', () => {
  describe('When there is a response', () => {
    nock(BACK_HOST, {
      reqheaders: {
        Authorization: '',
        'Content-Type': 'application/json',
      },
    })
      .get('/api/enrollments/1')
      .reply(200, SENT_ENROLLMENT);
    it('should return a 200 status', () => {
      return getUserEnrollment(1).then(response => {
        expect(response).toEqual(SENT_ENROLLMENT);
      });
    });
  });
});

describe('serializeEnrollment', () => {
  describe('When there is a response', () => {
    it('should return a 200 status', () => {
      const enrollment = FIRST_ENROLLMENT_1;
      const formData = serializeEnrollment(enrollment);
      expect(formData.getAll('enrollment[enrollment][state]')).toEqual([
        'pending',
      ]);
      expect(
        formData.getAll('enrollment[enrollment][fournisseur_de_service]')
      ).toEqual(['Nom du fournisseur de service']);
      expect(
        formData.getAll('enrollment[enrollment][description_service]')
      ).toEqual(['Description du service']);
      expect(
        formData.getAll('enrollment[enrollment][validation_de_convention]')
      ).toEqual(['true']);
      expect(
        formData.getAll('enrollment[enrollment][scope_dgfip_avis_imposition]')
      ).toEqual(['true']);
      expect(
        formData.getAll('enrollment[enrollment][scope_cnaf_attestation_droits]')
      ).toEqual(['true']);
      expect(
        formData.getAll('enrollment[enrollment][fournisseur_de_donnees]')
      ).toEqual(['api-particulier']);
      expect(formData.getAll('enrollment[enrollment][contacts][][id]')).toEqual(
        ['dpo']
      );
      expect(
        formData.getAll('enrollment[enrollment][contacts][][heading]')
      ).toEqual(['Délégué à la protection des données']);
      expect(
        formData.getAll('enrollment[enrollment][contacts][][nom]')
      ).toEqual(['Raphaël Dubigny']);
      expect(
        formData.getAll('enrollment[enrollment][contacts][][email]')
      ).toEqual(['rdubigny@gmail.com']);
    });
  });
});
