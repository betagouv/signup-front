import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Page from '../Page';


describe('components | Page', () => {
  describe('render', () => {
    const props = {};
    const renderer = ReactTestRenderer.create(<Page { ...props } />);
    it('should be defined', () => {
      expect(renderer).toBeDefined();
    });
    it('should match snapshot', () => {
      expect(renderer).toMatchSnapshot();
    });
  });
});
