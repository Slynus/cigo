import React from 'react';
import { render } from '@testing-library/react';
import AppRoot from './AppRoot';

test('renders learn react link', () => {
  // const { getByText } = render(<AppRoot />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
