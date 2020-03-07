import React from 'react';
import renderer from 'react-test-renderer';
import App from '../';

describe('App', () => {
  test('It renders without crashing', () => {
    expect(() => {
      renderer.create(
        <App/>,
      );
    }).not.toThrow();
  });
});
