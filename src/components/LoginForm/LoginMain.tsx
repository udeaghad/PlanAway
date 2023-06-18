import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { StyledLoginMainContainer } from './Style';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { login as postLoginData } from '../../features/auths/Login/loginSlice';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';

import LoginForm from './LoginForm'

const LoginMain = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { login } = useAppSelector((state) => state);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  useEffect(() => {
    if (login.data && login.data.status === 'success'){
      dispatch(userActions.setUser(login.data))
      dispatch(msgAction.getSuccessMsg("User signed in successfully!"))
      navigate(-1)
    }
    if ( login.error) {
      console.log(login.error)
      dispatch(msgAction.getErrorMsg("Wrong username or password!"))
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
  )
}

export default LoginMain