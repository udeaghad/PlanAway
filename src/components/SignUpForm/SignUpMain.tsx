import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


import SignUpForm from './SignUpForm'
import { StyledSignUpMainContainer } from './Style'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { signUp as postSignUpDetails } from '../../features/auths/signUp/signUpSlice';
import { userActions } from '../../features/auths/user/userSlice';
import { msgAction } from '../../features/msgHandler/msgHandler';


const SignUpMain = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { signUp } = useAppSelector(state => state)
  
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  useEffect(() => {
   
    if (signUp.data && signUp.data.status === 'success'){
      dispatch(userActions.setUser(signUp.data))
      dispatch(msgAction.getSuccessMsg("Account created successfully"))
      navigate(-1)
    }
    if (signUp.error) {
      dispatch(msgAction.getErrorMsg("Account already exist!"))
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
    <StyledSignUpMainContainer>
      <SignUpForm 
        handleSignUpOnChange={handleSignUpOnChange}
        handleClose={handleClose}
        signUpButtonDisabled={signUpButtonDisabled}
        handleSignUp={handleSignUp}
        handleNavigateToLogin={handleNavigateToLogin}
        signUpData={signUpData}
      />
    </StyledSignUpMainContainer>
  )
}

export default SignUpMain