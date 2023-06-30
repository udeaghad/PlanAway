import LocationMainBar from '../../components/LocationBar/LocationMainBar';
import { StyledContainer, StyledLocationContainer, StyledNavLink } from './Style';
import LoginMain from '../../components/LoginForm/LoginMain';
import { Box, Typography } from '@mui/material';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';



const LoginPage = () => {
  return (
    <div>
      <StyledLocationContainer>
        <LocationMainBar />
      </StyledLocationContainer>
      <StyledContainer>
        <div style={{paddingTop: "5rem"}}>
          <Box>
            <Typography variant="h6" component="h4" gutterBottom textAlign="center">
              Log In
            </Typography>
          </Box>

          <LoginMain />

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
    </div>
  )
}

export default LoginPage