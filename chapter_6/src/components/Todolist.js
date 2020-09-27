import React, { useState } from 'react';

function Todolist () {

  const [todo, setTodo] = useState({
    desc: '',
    date: ''
  })
  const [todos, setTodos] = useState([])

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value})
  }

  const addTodo = () => {
    setTodos([...todos, todo])
    setTodo({desc:'',date:''})
  }

  const deleteTodo = (index) => {
    const newList = todos.filter((todo, i) => i !== index)

    setTodos(newList)
  }

  return(
    <div>
      <h1>Simple Todolist</h1>
      <label>Desc:</label>
      <input type="text" name="desc" value={todo.desc} onChange={inputChanged} />
      <label>Date:</label>
      <input type="date" name="date" value={todo.date} onChange={inputChanged} />
      <button onClick={addTodo}>Add</button>
      <table>
        <tbody>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th></th>
          </tr>
          {
            todos.map((todo, index) =>
              <tr key={index}>
                <td>{todo.desc}</td>
                <td>{todo.date}</td>
                <td><button onClick={() => deleteTodo(index)}>Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Todolist;
