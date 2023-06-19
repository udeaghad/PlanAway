import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { StyledLoginMainContainer } from './Style';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { login as postLoginData, loginActions } from '../../features/auths/Login/loginSlice';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';

import {Box, Backdrop, CircularProgress} from '@mui/material';
// import  from '@mui/material/CircularProgress';

import LoginForm from './LoginForm'

const LoginMain = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { login } = useAppSelector((state) => state);

  const [openBackDrop, setOpenBackDrop] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  


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
    <Box>
      <Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>

      
      <Box>
        <StyledLoginMainContainer >
          <LoginForm
            handleLoginOnChange={handleLoginOnChange}
            handleClose={handleClose}
            loginButtonDisabled={loginButtonDisabled}
            handleLogin={handleLogin}
            handleNavigateToSignUp={handleNavigateToSignUp}
            loginData={loginData}
          />
        </StyledLoginMainContainer>
      </Box>

    </Box>
  )
}

export default LoginMain