import React from 'react';
import LocationMainBar from '../../components/LocationBar/LocationMainBar';
import { StyledContainer, LocationContainer } from './Style';
import LoginMain from '../../components/LoginForm/LoginMain';
import { Box, Typography } from '@mui/material';



const LoginPage = () => {
  return (
    <div>
      <LocationContainer>
        <LocationMainBar />
      </LocationContainer>
      <StyledContainer>
        <div style={{paddingTop: "5rem"}}>
          <Box>
            <Typography variant="h6" component="h4" gutterBottom textAlign="center">
              Log In
            </Typography>
          </Box>

          <LoginMain />
          
        </div>
      </StyledContainer>
    </div>
  )
}

export default LoginPage