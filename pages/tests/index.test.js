import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import index from '../index';

describe('pages | index', () => {
	describe('render', () => {
		const renderer = ReactTestRenderer.create(
			<index />
		);
		it('should be defined', () => {
			expect(renderer).toBeDefined();
		});
		it('should match snapshot', () => {
			expect(renderer).toMatchSnapshot();
		});
	});
});
