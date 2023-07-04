import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, Typography } from '@mui/material';

import LocationMainBar from '../../components/LocationBar/LocationMainBar';
import { StyledContainer, StyledLocationContainer, StyledNavLink } from './Style';
import LoginMain from '../../components/LoginForm/LoginMain';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { login as postLoginData, loginActions } from '../../features/auths/Login/loginSlice';
import { getAllTrips } from '../../features/SavedTrip/SavedTrip';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';




const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { login, user: {user} } = useAppSelector((state) => state);

  const [openBackDrop, setOpenBackDrop] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  useEffect(() => {
    
    if (user){
      dispatch(loginActions.resetLogin())
      dispatch(getAllTrips({token: user.token}))
    } 

  }, [user, dispatch])



  useEffect(() => {
    if(login.isLoading){
      setOpenBackDrop(true)
    } else {
      setOpenBackDrop(false)
    }
    if (login.data && login.data.status === 'success'){
      
      dispatch(userActions.setUser(login.data))     
 
      dispatch(msgAction.getSuccessMsg("User signed in successfully!"))
      navigate(-1)
      return
    }
    if ( login.error) {
      dispatch(msgAction.getErrorMsg("Wrong email or password!"))
      dispatch(loginActions.resetLogin())
      return
    }
  }, [login, dispatch, navigate])

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

  const handleClose = () => {
    setLoginButtonDisabled(true)
    setLoginData({
      email: "",
      password: ""
    })
    navigate(-1)
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

  }

  const handleNavigateToSignUp = () => {
      navigate("/SignUp")
  }


  return (
    <div>
      <StyledLocationContainer>
        <LocationMainBar />
      </StyledLocationContainer>
      <StyledContainer>
        <div style={{paddingTop: "5rem"}}>
          <Box>
            <Typography variant="h6" component="h4" gutterBottom textAlign="center">
              Log In
            </Typography>
          </Box>

          <LoginMain 
            handleLoginOnChange={handleLoginOnChange}
            handleClose={handleClose}
            loginButtonDisabled={loginButtonDisabled}
            handleLogin={handleLogin}
            handleNavigateToSignUp={handleNavigateToSignUp}
            loginData={loginData}
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
    </div>
  )
}

export default LoginPage