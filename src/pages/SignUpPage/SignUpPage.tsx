import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { StyledContainer, LocationContainer, StyledNavLink } from './Style';
import SignUpMain from '../../components/SignUpForm/SignUpMain'
import LocationMainBar from '../../components/LocationBar/LocationMainBar';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { signUp as postSignUpDetails, signUpActions } from '../../features/auths/signUp/signUpSlice';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';
import { getAllTrips } from '../../features/SavedTrip/SavedTrip';


const SignUpPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { signUp, user: {user} } = useAppSelector(state => state)

  const [openBackDrop, setOpenBackDrop] = useState(false);
  
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  useEffect(() => {
    
    if (user){
      dispatch(signUpActions.resetSignUp())
      dispatch(getAllTrips({token: user.token}))
    } 
  }, [user, dispatch])

  useEffect(() => {
   
    
    if(signUp.isLoading){
      setOpenBackDrop(true)
    } else {
      setOpenBackDrop(false)
    }
    
    if (signUp.data && signUp.data.status === 'success'){
      
      dispatch(userActions.setUser(signUp.data))
      dispatch(msgAction.getSuccessMsg("Account created successfully"))
      
      navigate(-1)
      return
    }
    if (signUp.error) {
      dispatch(msgAction.getErrorMsg("Account already exist!"))
      dispatch(signUpActions.resetSignUp())
      return
    }
  }, [signUp, dispatch, navigate])


  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

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

  const handleClose = () => {
    setSignUpButtonDisabled(true)
    setSignUpData({
      email: "",
      password: "",
      confirmPassword: ""
    })
    navigate(-1)
  };

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
    }

  }

  const handleNavigateToLogin = () => {    
     navigate("/Login")
  }

  return (
    <div>
      <LocationContainer>
        <LocationMainBar />
      </LocationContainer>

      <StyledContainer>
        <div style={{paddingTop: "5rem"}}>
          <Box>
            <Typography variant="h6" component="h4" gutterBottom textAlign="center">
              Create Account
            </Typography>
          </Box>

          <SignUpMain
            handleSignUpOnChange={handleSignUpOnChange}
            handleClose={handleClose}
            signUpButtonDisabled={signUpButtonDisabled}
            handleSignUp={handleSignUp}
            handleNavigateToLogin={handleNavigateToLogin}
            signUpData={signUpData}
            openBackDrop={openBackDrop}
          />

          <StyledNavLink
          to="/"
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',              
                cursor: 'pointer',
                flexDirection: 'row',
                width: '100%',
                gap: "1px"
              }}
              >
                <Typography variant="subtitle2" component="div" textAlign="center">
                  Continue without logging in
                </Typography>
                <ArrowRightAltIcon />
            </Box>
          </StyledNavLink>
          
        </div>
      </StyledContainer>

      <div>
      
      </div>

    </div>
  )
}

export default SignUpPage