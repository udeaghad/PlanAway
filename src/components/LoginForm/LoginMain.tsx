import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { StyledLoginMainContainer } from './Style';

import LoginForm from './LoginForm'

const LoginMain = () => {
  const navigate = useNavigate()
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

  const handleClose = () => {
    setLoginButtonDisabled(true)
    setLogin({
      email: "",
      password: ""
    })
    navigate(-1)
  };

  const handleLogin = () => {
    console.log(login);
    navigate(-1)
  }

  const handleNavigateToSignUp = () => {
    console.log("navigate to sign up");
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
       />
    </StyledLoginMainContainer>
  )
}

export default LoginMain