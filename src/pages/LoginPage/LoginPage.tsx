import React from 'react';
import LocationMainBar from '../../components/LocationBar/LocationMainBar';
import { StyledContainer } from './Style';
import LoginMain from '../../components/LoginForm/LoginMain';



const LoginPage = () => {
  return (
    <div>
      <div>
        <LocationMainBar />
      </div>
      <StyledContainer>
        <div style={{paddingTop: "5rem"}}>
          <LoginMain />
        </div>
      </StyledContainer>
    </div>
  )
}

export default LoginPage