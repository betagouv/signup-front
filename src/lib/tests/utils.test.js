import { extractTokenFromUrl } from '../utils';

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
});
