import React, { useState, useRef } from 'react'

import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

// import TodoTable from './TodoTable.js'


function Todolist () {

  const [todo, setTodo] = useState({
    desc: '',
    date: '',
    priority: ''
  })
  const [todos, setTodos] = useState([])


  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value})
  }

  const addTodo = () => {
    setTodos([...todos, todo])
    setTodo({desc:'',date:'',priority:''})
  }

  const deleteTodo = (index) => {
    // This code works with the AgGridReact module
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
    } else {
      alert('Select row first')
    }

    // If we use the external TodoTable.js component to render the table,
    //  use this code below
    // setTodos(todos.filter((todo, i) => i !== index))
    // Remember to add this to render-> <TodoTable delete={deleteTodo} todos={todos}/>

  }

  const gridRef = useRef();

  const columns = [
    { headerName: "Description", field: "desc", sortable: true, filter: true, floatingFilter: true },
    { headerName: "Date", field: "date", sortable: true, filter: true, floatingFilter: true },
    { headerName: "Priority", field: "priority", sortable: true, filter: true, floatingFilter: true,
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}
    }
  ]

  return(
    <div>
      <h1>Simple Todolist</h1>
      <label>Desc:</label>
      <input type="text" name="desc" value={todo.desc} onChange={inputChanged} />
      <label>Date:</label>
      <input type="date" name="date" value={todo.date} onChange={inputChanged} />
      <label>Priority:</label>
      <input type="text" name="priority" value={todo.priority} onChange={inputChanged} />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>

      <div className="ag-theme-material" style={{height: '500px'}}>
        <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
          animateRows="true">
        </AgGridReact>
      </div>
    </div>
  )
}

export default Todolist
