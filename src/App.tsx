import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {Typography} from '@mui/material';
import Header from './components/Header/Header';
import LocationBar from './components/LocationBar/LocationBar';


const App = () => {
  return (
    <div>
      <CssBaseline />
      <Header />
      <LocationBar />
      <Typography variant="h3">Hello World</Typography>
      
    </div>
  );
}

export default App;
