import React from 'react';
import ReactDOM from 'react-dom';

// import { render, findAllByText } from '@testing-library/react';
import AppRoot from './AppRoot';

test('renders learn react link', () => {
  // const { getByText } = render(<AppRoot />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  // const { container,findAllByText } = render(<AppRoot />);
  // const testElem = findAllByText("Search");

  // console.log("ééééé");
  // console.log(container);
  // console.log("ooooo");
  // expect(testElem).toBeInTheDocument();
});

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AppRoot />, div);
  ReactDOM.unmountComponentAtNode(div);
});

