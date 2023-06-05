import React from 'react';
import LocationMainBar from '../../components/LocationBar/LocationMainBar';
import { StyledContainer } from './Style';
import LoginMain from '../../components/LoginForm/LoginMain';
import { Box, Typography } from '@mui/material';



const LoginPage = () => {
  return (
    <div>
      <div>
        <LocationMainBar />
      </div>
      <StyledContainer>
        <div style={{paddingTop: "5rem"}}>
          <Box>
            <Typography variant="h6" component="h4" gutterBottom marginLeft="45%">
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