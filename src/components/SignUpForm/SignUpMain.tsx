import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import SignUpForm from './SignUpForm'
import { StyledSignUpMainContainer } from './Style'

const SignUpMain = () => {
  const navigate = useNavigate()

  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

  const handleSignUpOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (signUp.email && signUp.password && signUp.confirmPassword) {
      setSignUpButtonDisabled(false);
    } else {
      setSignUpButtonDisabled(true);
    }

    setSignUp({
      ...signUp,
      [event.target.id]: event.target.value
    })
  }

  const handleClose = () => {
    setSignUpButtonDisabled(true)
    setSignUp({
      email: "",
      password: "",
      confirmPassword: ""
    })
    navigate(-1)
  };

  const handleSignUp = () => {
    console.log(signUp);
    navigate(-1)
  }

  const handleNavigateToLogin = () => {
    console.log("navigate to login");
     navigate("/Login")
  }


  return (
    <StyledSignUpMainContainer>
      <SignUpForm 
        handleSignUpOnChange={handleSignUpOnChange}
        handleClose={handleClose}
        signUpButtonDisabled={signUpButtonDisabled}
        handleSignUp={handleSignUp}
        handleNavigateToLogin={handleNavigateToLogin}
      />
    </StyledSignUpMainContainer>
  )
}

export default SignUpMain