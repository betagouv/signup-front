import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Layout from '../Layout';


describe('components | Layout', () => {
	describe('render', () => {
		const renderer = ReactTestRenderer.create(
			<Layout />
		);

		it('should be defined', () => {
			expect(renderer).toBeDefined();
		});
		it('should match snapshot', () => {
			expect(renderer).toMatchSnapshot();
		});
	});
});
