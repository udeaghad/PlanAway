import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { ulid } from 'ulid';
// import { useNavigate } from 'react-router-dom'

import {useAppSelector, useAppDispatch} from '../../hooks/storeHooks';

import { StyledSaveItineraryButton } from './Style';
import LoginDialogueBox from './LoginDialogueBox';
import SignUpDialogueBox from './SignUpDialogueBox';
import { postTrip } from '../../features/SavedTrip/SavedTrip';
// import { login as postLoginData } from '../../features/auths/Login/loginSlice';
// import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { login as postLoginData, loginActions } from '../../features/auths/Login/loginSlice';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';




const SaveItineraryPopButton = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  

  

  const [openBackDropLogin, setOpenBackDropLogin] = useState(false);

  const { user: {user}, optimizedPlaces: {optimizedPlaces}, origin, login } = useAppSelector(state => state);
  
  const [open, setOpen] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  useEffect(() => {
    if(login.isLoading){
      setOpenBackDropLogin(true)
    } else {
      setOpenBackDropLogin(false)
    }
    if (login.data && login.data.status === 'success'){
      
      dispatch(userActions.setUser(login.data))
      dispatch(msgAction.getSuccessMsg("User signed in successfully!"))
      setOpen(false);
      return
    }
    if ( login.error) {
      dispatch(msgAction.getErrorMsg("Wrong email or password!"))
      dispatch(loginActions.resetLogin())
      return
    }
  }, [login, dispatch])


  

  const handleLoginOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); 
    
    if (loginData.email && loginData.password) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }

    setLoginData({
      ...loginData,
      [event.target.id]: event.target.value
    })
  }


  const handleClickOpen = () => {
    if (!user){
      setOpen(true);
      setLoginData({
        email: "",
        password: ""
      })
      setOpenSignUp(false);
      setLoginButtonDisabled(true);
      return
    }

    if(user && optimizedPlaces){
      const tripData = {
        trip: ulid(),
        date: new Date().toISOString().slice(0, 10),
        place: optimizedPlaces.map(place => {
          return {
            id: place.id,
            items: place.items.map((item: any) => {
              return {
                name: item.name,
                address: item.address,
                location_id: item.location_id,
                longitude: item.longitude,
                latitude: item.latitude,
              }
            })
          }
        }),
        origin,
        token: user.token
      }

      dispatch(postTrip(tripData))
    }

  };

  const handleClose = () => {
    setOpen(false); 
    
  };

  const handleLogin = () => {    
    // setOpen(false);

    const { email, password } = loginData

    if(email && loginData){
      dispatch(postLoginData({email, password}))

      setLoginData({
        email: "",
        password: ""
      })
    }
    
  }

  const [ openSignUp, setOpenSignUp ] = useState(false);

  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  })

  const handleSignUpOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (signUp.email && signUp.password && signUp.passwordConfirm) {
      setSignUpButtonDisabled(false);
    } else {
      setSignUpButtonDisabled(true);
    }

    setSignUp({
      ...signUp,
      [event.target.id]: event.target.value
    })
  }

  const handleOpenSignUpDialogue = () => {
    setOpen(false);
    setOpenSignUp(true);
    setSignUp({
      email: "",
      password: "",
      passwordConfirm: ""
    })

    setSignUpButtonDisabled(true);

  }

  const handleCloseSignUpDialogue = () => {
    setOpenSignUp(false);     
  }

  const handleSignUp = () => {
    console.log(signUp);
    setOpenSignUp(false);
    
  }

  return (
    <div >
      
      <StyledSaveItineraryButton                     
        onClick={handleClickOpen}
        >
          <Typography variant="button" sx={{padding: "0.15rem 0.5rem 0.15rem 0.5rem"}}>
            SAVE MY ITINERARY
          </Typography>
          
      </StyledSaveItineraryButton> 

      <LoginDialogueBox 
        open={open}
        handleClose={handleClose}
        handleLoginOnChange={handleLoginOnChange}
        loginButtonDisabled={loginButtonDisabled}
        handleLogin={handleLogin}
        handleOpenSignUpDialogue={handleOpenSignUpDialogue}
        openBackDropLogin={openBackDropLogin}
      />

      <SignUpDialogueBox
        openSignUp={openSignUp}
        handleCloseSignUpDialogue={handleCloseSignUpDialogue}
        handleSignUpOnChange={handleSignUpOnChange}
        signUpButtonDisabled={signUpButtonDisabled}
        handleSignUp={handleSignUp}
        handleClickOpen={handleClickOpen}
      />

    </div>
  );

}

export default SaveItineraryPopButton