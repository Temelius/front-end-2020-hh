import React, { useState, useRef } from 'react'

import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

// import TodoTable from './TodoTable.js'


function Todolist () {

  const [todo, setTodo] = useState({
    desc: '',
    date: '',
    priority: ''
  })
  const [todos, setTodos] = useState([
    {
      desc: 'AATOS',
      date: '2020-10-20',
      priority: 'High'
    },
    {
      desc: 'BOSS',
      date: '2020-10-19',
      priority: 'Medium'
    },
    {
      desc: 'AATOSBOSS',
      date: '2020-05-03',
      priority: 'Small'
    }
  ])

  const [selectedDate, handleDateChange] = useState(new Date())

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value})
  }
  const dateChanged = (props) => {
    //let newDate = `${props.getFullYear()}-${props.getMonth()}-${props.getDate}`
    setTodo({...todo, date: props})
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
      <h1 className="App-header">Simple Todolist</h1>
      <TextField label="Description" type="text" name="desc" value={todo.desc} onChange={inputChanged} />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker variant="inline" name="date" value={todo.date} onChange={date => dateChanged(date)} />
      </MuiPickersUtilsProvider>
      <TextField label="Priority" type="text" name="priority" value={todo.priority} onChange={inputChanged} />
      <Button onClick={addTodo} variant="contained" color="primary">Add</Button>
      <Button onClick={deleteTodo} variant="contained" color="secondary">Delete</Button>

      <div className="ag-theme-material" style={{height: '500px', width:'70%', margin:'auto'}}>
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
