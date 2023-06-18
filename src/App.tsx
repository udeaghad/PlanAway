import React, {useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom'; 

import OptimizePage from './pages/OptimizePage/OptimizePage';
import Header from './components/Header/Header';                                                                                                                                                                                                      
import BookingPage from './pages/BookingPage/BookingPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import BreadCrumbs from './components/BreadCrumbs/BreadCrumbs';
import { useAppDispatch, useAppSelector } from './hooks/storeHooks';
// import { signUp } from './features/auths/signUp/signUpSlice';
import { userActions } from './features/auths/user/userSlice'; 
import Notification from './components/Notification/Notification'



const App = () => {

  // const dispatch = useAppDispatch()

  // const { signUp } = useAppSelector(state => state)

  // useEffect(() => {
  //   if (signUp.data && signUp.data.status === 'success'){
  //     dispatch(userActions.setUser(signUp.data))
  //   }
  // }, [signUp.data, dispatch])


  return (
    <div>
      <CssBaseline />
      <Header />
      <BreadCrumbs />
      <Notification />
      <Routes>
        <Route path="/" element={ <LandingPage />} />
        <Route path="/Add-Activities" element={ <BookingPage />} />
        <Route path="/Add-Activities/Optimize-Itinerary" element={ <OptimizePage />} />
        <Route path="/Login" element={ <LoginPage />} />
        <Route path="/SignUp" element={ <SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
