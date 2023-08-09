
import {Box, Backdrop, CircularProgress, TextField, Typography, Button} from '@mui/material';
import { StyledCancelButton, StyledLoginButton } from './Style';

import { StyledSignUpMainContainer } from './Style'

interface SignUpFormProps {
  handleSignUpOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  signUpButtonDisabled: boolean;
  handleSignUp: () => void;
  handleNavigateToLogin: () => void;
  signUpData: { email: string; password: string; confirmPassword: string};
  openBackDrop: boolean;
}



const SignUpMain = ({handleSignUpOnChange, handleClose, signUpButtonDisabled, handleSignUp, handleNavigateToLogin, signUpData, openBackDrop}: SignUpFormProps) => {
 
  return (
    <Box>      
      <Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>      

      <StyledSignUpMainContainer>
        <Box>
          <Box
            component="form"
            sx={{
              
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem"
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="filled"
              value={signUpData.email}
              onChange={handleSignUpOnChange}
              sx={{
                backgroundColor: "white"
              }}
            />

            <TextField            
              margin="dense"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              variant="filled"
              data-testid="password"
              value={signUpData.password}
              onChange={handleSignUpOnChange}
              sx={{
                backgroundColor: "white"
              }}
            />

            <TextField            
              margin="dense"
              id="confirmPassword"
              label="Re-enter Password"
              type="password"
              autoComplete="password"
              fullWidth
              variant="filled"
              data-testid="confirmPassword"
              value={signUpData.confirmPassword}
              onChange={handleSignUpOnChange}
              sx={{
                backgroundColor: "white"
              }}
            />
            
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              margin: "2rem"

            }}    
          >
            <StyledCancelButton onClick={handleClose}>CANCEL</StyledCancelButton>
            <StyledLoginButton disabled={signUpButtonDisabled} onClick={handleSignUp}>SIGN UP</StyledLoginButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              margin: "2rem"
            }}
          >
            <Typography variant="subtitle1">
              Already have an account?
            </Typography>

            <Button variant="text" onClick={handleNavigateToLogin}>          
              LOG IN
            </Button>
          </Box>                    
        </Box>
      </StyledSignUpMainContainer>
    </Box>
  )
}

export default SignUpMain