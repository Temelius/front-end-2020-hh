import React, { useState, useEffect, useRef } from 'react'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'

import moment from 'moment'

import AddTraining from './AddTraining'

const TrainingsList = () => {

  const [trainings, setTrainings] = useState([])
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const gridRef = useRef()

  useEffect(() => {
      getTrainings()
  }, [])

  const getTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
          .then(response => response.json())
          .then(data => setTrainings(data))
          .catch(err => console.error(err))
  }


  const deleteTraining = (link) => {
      if (window.confirm('Are you sure?')) {
          fetch('https://customerrest.herokuapp.com/api/trainings/' + link.data.id, {
              method: 'DELETE'
          })
              .then(_ => gridRef.current.refreshCells({ rowNodes: getTrainings() }))
              .then(_ => setMsg('Training was deleted succesfully'))
              .then(_ => setOpen(true))
              .catch(err => console.error(err))
      }
  }

  const closeSnackbar = () => {
      setOpen(false);
  }

  const columns = [
      { headerName: 'Date', field: 'date', sortable: true, filter: true,
        cellRenderer: (data) => {
          return moment(data.value).format("MM/DD/YYYY HH:mm")
        }
      },
      { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true },
      { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
      { headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true },
      { headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true },
      {
          headerName: '',
          field: 'links.0.href',
          width: 90,
          cellRendererFramework: params =>
              <Button color="secondary" size="small" onClick={() => deleteTraining(params)}>Delete</Button>
      }
  ]

  return (
    <div>
      <div className="ag-theme-material" style={{ height: '700px', width: '80%', margin: 'auto' }}>
          <AgGridReact
              suppressCellSelection={true}
              ref={gridRef}
              onGridReady={params => {
                  gridRef.current = params.api
              }}
              columnDefs={columns}
              rowData={trainings}
              pagination={true}
              paginationPageSize={10}>
          </AgGridReact>
          <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={closeSnackbar}
              message={msg}
          />
      </div>
    </div>
  )
}

export default TrainingsList
