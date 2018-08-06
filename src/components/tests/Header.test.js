import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Header from '../Header';

describe('components | Header', () => {
  describe('render', () => {
    const renderer = ReactTestRenderer.create(<Header logout={() => null} />);
    it('should be defined', () => {
      expect(renderer).toBeDefined();
    });
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot();
    });
  });
});
