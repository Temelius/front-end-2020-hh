import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

import CustomersList from './components/CustomersList'
import TrainingsList from './components/TrainingsList'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const App = () => {

  const [value, setValue] = React.useState('customers')

  const handleChange = (event, value) => {
    setValue(value)
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="customers" label="Customers" />
          <Tab value="trainings" label="Trainings" />
        </Tabs>
      </AppBar>
      {value === 'customers' && <CustomersList />}
      {value === 'trainings' && <TrainingsList />}
    </div>
  );
}

export default App;
