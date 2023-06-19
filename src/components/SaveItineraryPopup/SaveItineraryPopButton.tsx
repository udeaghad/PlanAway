import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

import {useAppSelector} from '../../hooks/storeHooks';

import { StyledSaveItineraryButton } from './Style';
import LoginDialogueBox from './LoginDialogueBox';
import SignUpDialogueBox from './SignUpDialogueBox';


const SaveItineraryPopButton = () => {
  const { user: {user}, optimizedPlaces: {optimizedPlaces} } = useAppSelector(state => state);
  useEffect(() => {
    console.log(optimizedPlaces);
  }, [optimizedPlaces])
  
  const [open, setOpen] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  

  const handleLoginOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); 
    
    if (login.email && login.password) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }

    setLogin({
      ...login,
      [event.target.id]: event.target.value
    })
  }


  const handleClickOpen = () => {
    if (!user){
      setOpen(true);
      setLogin({
        email: "",
        password: ""
      })
      setOpenSignUp(false);
      setLoginButtonDisabled(true);
    }
  };

  const handleClose = () => {
    setOpen(false); 
    
  };

  const handleLogin = () => {
    console.log(login);
    setOpen(false);
    
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