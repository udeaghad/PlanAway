import React from 'react';
import { Box, Typography } from '@mui/material';

import { StyledContainer, LocationContainer } from './Style';
import SignUpMain from '../../components/SignUpForm/SignUpMain'
import LocationMainBar from '../../components/LocationBar/LocationMainBar';


const SignUpPage = () => {
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

          <SignUpMain />
          
        </div>
      </StyledContainer>

      <div>
      
      </div>

    </div>
  )
}

export default SignUpPage