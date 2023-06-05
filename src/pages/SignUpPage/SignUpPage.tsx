import React from 'react';
import { Box, Typography } from '@mui/material';

import { StyledContainer } from './Style';
import SignUpMain from '../../components/SignUpForm/SignUpMain'
import LocationMainBar from '../../components/LocationBar/LocationMainBar';


const SignUpPage = () => {
  return (
    <div>
      <div>
        <LocationMainBar />
      </div>

      <StyledContainer>
        <div style={{paddingTop: "5rem"}}>
          <Box>
            <Typography variant="h6" component="h4" gutterBottom marginLeft="43%">
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