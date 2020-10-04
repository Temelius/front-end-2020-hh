import React from 'react'

const TodoTable = (props) => {

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th></th>
          </tr>
          {
            props.todos.map((todo, index) =>
              <tr key={index}>
                <td>{todo.desc}</td>
                <td>{todo.date}</td>
                <td><button onClick={() => props.delete(index)}>Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default TodoTable
