import React from 'react';
import { Box, Typography } from '@mui/material';

import { StyledContainer, LocationContainer, StyledNavLink } from './Style';
import SignUpMain from '../../components/SignUpForm/SignUpMain'
import LocationMainBar from '../../components/LocationBar/LocationMainBar';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


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

          <StyledNavLink
          to="/"
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',              
                cursor: 'pointer',
                flexDirection: 'row',
                width: '100%',
                gap: "1px"
              }}
              >
                <Typography variant="subtitle2" component="div" textAlign="center">
                  Continue without logging in
                </Typography>
                <ArrowRightAltIcon />
            </Box>
          </StyledNavLink>
          
        </div>
      </StyledContainer>

      <div>
      
      </div>

    </div>
  )
}

export default SignUpPage