import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { ulid } from 'ulid';


import {useAppSelector, useAppDispatch} from '../../hooks/storeHooks';

import { StyledSaveItineraryButton } from './Style';
import LoginDialogueBox from './LoginDialogueBox';
import SignUpDialogueBox from './SignUpDialogueBox';
import { postTrip } from '../../features/SavedTrip/SavedTrip';

import { login as postLoginData, loginActions } from '../../features/auths/Login/loginSlice';
import { signUp as postSignUpDetails, signUpActions } from '../../features/auths/signUp/signUpSlice';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';
import { getAllTrips } from '../../features/SavedTrip/SavedTrip';




const SaveItineraryPopButton = () => {
  const dispatch = useAppDispatch();
  
  const { user: {user}, optimizedPlaces: {optimizedPlaces}, origin, login, signUp } = useAppSelector(state => state);
  
  const [openBackDropLogin, setOpenBackDropLogin] = useState(false);
  
  const [open, setOpen] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  useEffect(() =>{
    if(user){
      dispatch(loginActions.resetLogin())
      dispatch(signUpActions.resetSignUp())
      dispatch(getAllTrips({token: user.token}))
    }
   
  }, [user, dispatch])

  useEffect(() => {
    if(login.isLoading){
      setOpenBackDropLogin(true)
    } else {
      setOpenBackDropLogin(false)
    }

    if ( login.error) {
      dispatch(msgAction.getErrorMsg("Wrong email or password!"))
      dispatch(loginActions.resetLogin())
      return
    }

    if (login.data && login.data.status === 'success'){
      
      dispatch(userActions.setUser(login.data))
      dispatch(msgAction.getSuccessMsg("User signed in successfully!"))
      setOpen(false);
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
    
    const { email, password } = loginData
    
    if(email && loginData){
      dispatch(postLoginData({email, password}))

      setLoginData({
        email: "",
        password: ""
      })
    }
    
        setOpen(false);
  }

  const [ openSignUp, setOpenSignUp ] = useState(false);

  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);
  const [openBackDropSignUp, setOpenBackDropSignUp] = React.useState(false);

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  useEffect(() => {
   
    
    if(signUp.isLoading){
      setOpenBackDropSignUp(true)
    } else {
      setOpenBackDropSignUp(false)
    }
    
    if (signUp.error) {
      dispatch(msgAction.getErrorMsg("Account already exist!"))
      dispatch(signUpActions.resetSignUp())
      return
    }

    if (signUp.data && signUp.data.status === 'success'){      
      dispatch(userActions.setUser(signUp.data))
      dispatch(msgAction.getSuccessMsg("Account created successfully"))
      setOpenSignUp(false);
    }


    // if(user && optimizedPlaces){
    //   const tripData = {
    //     trip: ulid(),
    //     date: new Date().toISOString().slice(0, 10),
    //     place: optimizedPlaces.map(place => {
    //       return {
    //         id: place.id,
    //         items: place.items.map((item: any) => {
    //           return {
    //             name: item.name,
    //             address: item.address,
    //             location_id: item.location_id,
    //             longitude: item.longitude,
    //             latitude: item.latitude,
    //           }
    //         })
    //       }
    //     }),
    //     origin,
    //     token: user.token
    //   }

    //   dispatch(postTrip(tripData));
    // }
      
  }, [signUp, dispatch, origin, user, optimizedPlaces])


  const handleSignUpOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (signUpData.email && signUpData.password && signUpData.confirmPassword) {
      setSignUpButtonDisabled(false);
    } else {
      setSignUpButtonDisabled(true);
    }

    setSignUpData({
      ...signUpData,
      [event.target.id]: event.target.value
    })
  }

  const handleOpenSignUpDialogue = () => {
    setOpen(false);
    setOpenSignUp(true);
    setSignUpData({
      email: "",
      password: "",
      confirmPassword: ""
    })

    setSignUpButtonDisabled(true);

  }

  const handleCloseSignUpDialogue = () => {
    setOpenSignUp(false);     
  }

  const handleSignUp = () => {
    const {email, password, confirmPassword } = signUpData
    if (email && password && confirmPassword && password !== confirmPassword){
      dispatch(msgAction.getErrorMsg("Password mismatch"))
      return;
    }

    if (email && password && confirmPassword && password === confirmPassword) {
      dispatch(postSignUpDetails({email, password}))

      setSignUpData({
        email: "",
        password: "",
        confirmPassword: ""
      })
      setOpenSignUp(false);    
    }
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
        openBackDropSignUp={openBackDropSignUp}
      />

    </div>
  );

}

export default SaveItineraryPopButton