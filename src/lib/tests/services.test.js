import nock from 'nock';
import {
  getUserEnrollments,
  getUserEnrollment,
  serializeEnrollment,
} from '../../lib/services';
import * as UserContext from '../../components/UserContext';
import FIRST_ENROLLMENT_1 from '../../../mock/enrollment-form/first-form-enrollment';
import ENROLLMENTS from '../../../mock/api/get-user-enrollments-response';
import SENT_ENROLLMENT from '../../../mock/enrollment-form/sent-enrollment';

const { REACT_APP_BACK_HOST: BACK_HOST } = process.env;

describe('getUserEnrollments', () => {
  describe('When there is a response', () => {
    nock(BACK_HOST, {
      reqheaders: {
        'Content-Type': 'application/json',
      },
    })
      .get('/api/enrollments/')
      .reply(200, ENROLLMENTS);
    UserContext.resetUserContext = jest.fn();

    it('should return the data', () => {
      return getUserEnrollments({}).then(response => {
        expect(response).toEqual(ENROLLMENTS);
      });
    });
  });
});

describe('getUserEnrollment', () => {
  describe('When there is a response', () => {
    nock(BACK_HOST, {
      reqheaders: {
        'Content-Type': 'application/json',
      },
    })
      .get('/api/enrollments/1')
      .reply(200, SENT_ENROLLMENT);
    UserContext.resetUserContext = jest.fn();

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
      expect(formData.getAll('enrollment[enrollment][status]')).toEqual([
        'pending',
      ]);
      expect(formData.getAll('enrollment[enrollment][intitule]')).toEqual([
        'Nom du fournisseur de service',
      ]);
      expect(formData.getAll('enrollment[enrollment][description]')).toEqual([
        'Description du service',
      ]);
      expect(formData.getAll('enrollment[enrollment][cgu_approved]')).toEqual([
        'true',
      ]);
      expect(formData.getAll('enrollment[enrollment][scopes][phone]')).toEqual([
        'true',
      ]);
      expect(formData.getAll('enrollment[enrollment][scopes][gender]')).toEqual(
        ['true']
      );
      expect(formData.getAll('enrollment[enrollment][target_api]')).toEqual([
        'franceconnect',
      ]);
      expect(formData.getAll('enrollment[enrollment][contacts][][id]')).toEqual(
        ['dpo']
      );
      expect(
        formData.getAll('enrollment[enrollment][contacts][][heading]')
      ).toEqual(['Délégué à la protection des données']);
      expect(
        formData.getAll('enrollment[enrollment][contacts][][nom]')
      ).toEqual(['user']);
      expect(
        formData.getAll('enrollment[enrollment][contacts][][email]')
      ).toEqual(['user@test']);
    });
  });
});
