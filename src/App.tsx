import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import {Typography} from '@mui/material';
import Header from './components/Header/Header';
import LocationBar from './components/LocationBar/LocationBar';
import BookingPage from './pages/BookingPage/BookingPage';


const App = () => {
  return (
    <div>
      <CssBaseline />
      <Header />
      <LocationBar />
      <BookingPage />
    </div>
  );
}

export default App;
