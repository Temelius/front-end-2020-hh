import React from 'react'
import TodoTable from './TodoTable'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('renders todotable', () => {
  const row = [
    { desc: 'Go to coffee', date: '24.11.2019' }
  ]

  const todotable = render(<TodoTable todos={row} />)
  expect(todotable.container).toHaveTextContent('Go to coffee')
})
