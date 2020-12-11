import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('add todo and clear todos', () => {
  const { container, getByText, getByPlaceholderText } = render(<App />)

  const desc = getByPlaceholderText('Description')
  fireEvent.change(desc, { target: { value: 'Go to coffee' } })

  const date = getByPlaceholderText('Date')
  fireEvent.change(date, { target: { value: '29.11.2019' } })

  // var identifier 'let' because it's value is going to be changed
  let button = getByText('Add')
  fireEvent.click(button)

  expect(container).toHaveTextContent('Go to coffee')

  // exercise 23
  button = getByText('Delete All')
  fireEvent.click(button)

  expect(container).not.toHaveTextContent('Go to coffee')
})
