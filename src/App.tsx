import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom'; 

import OptimizePage from './pages/OptimizePage/OptimizePage';
import Header from './components/Header/Header';                                                                                                                                                                                                      
import BookingPage from './pages/BookingPage/BookingPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';


const App = () => {

  

  return (
    <div>
      <CssBaseline />
      <Header />
      <Routes>
        {/* <Route path="/" element={ <LandingPage />} />
        <Route path="/Booking" element={ <BookingPage />} />
        <Route path="/Optimize" element={ <OptimizePage />} />
        <Route path="/Login" element={ <LoginPage />} />
        <Route path="/SignUp" element={ <SignUpPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
