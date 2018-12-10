import { extractTokenFromUrl, isValidNAFCode } from '../utils';

describe('utils', () => {
  describe('extractTokenFromUrl', () => {
    describe('I have an url without hash', () => {
      const url = 'http://localhost:3000';

      it('should return nothing', () => {
        const token = extractTokenFromUrl(url);
        expect(token).toBe('');
      });
    });

    describe('I have an oauth url', () => {
      const url =
        'http://localhost:3000/#access_token=e5498b836ef3abfb3e33c20116c06e293fca47c2970df5344cfb49353273586c&token_type=bearer&expires_in=7200';

      it('should return token', () => {
        const token = extractTokenFromUrl(url);

        expect(token).toBe(
          'e5498b836ef3abfb3e33c20116c06e293fca47c2970df5344cfb49353273586c'
        );
      });
    });
  });

  describe('isValidNAFCode', () => {
    it('should return true for COMMUNE D HEM', () => {
      expect(isValidNAFCode('api-particulier', '8411Z')).toBe(true);
    });
    it('should return true for ASSISTANCE PUBLIQUE HOPITAUX DE PARIS', () => {
      expect(isValidNAFCode('api-particulier', '8610Z')).toBe(true);
    });
    it('should return false for RED NEEDLES', () => {
      expect(isValidNAFCode('api-particulier', '6202A')).toBe(false);
    });
    it('should return true if provider does not filter on NAF code', () => {
      expect(isValidNAFCode('dgfip', '6202A')).toBe(true);
    });
  });
});
