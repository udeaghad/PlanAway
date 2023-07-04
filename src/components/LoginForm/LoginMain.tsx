import React from 'react';
import { Box, TextField, Typography, Button, Backdrop, CircularProgress } from '@mui/material';

import { StyledCancelButton, StyledLoginButton,  StyledLoginMainContainer } from './Style';


interface LoginFormProps {
  handleLoginOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  loginButtonDisabled: boolean;
  handleLogin: () => void;
  handleNavigateToSignUp: () => void;
  loginData: {email: string, password: string};
  openBackDrop: boolean;
}

const LoginMain = ({
  handleLoginOnChange, 
  handleClose, 
  loginButtonDisabled, 
  handleLogin, 
  handleNavigateToSignUp,
  loginData,
  openBackDrop
}: LoginFormProps) => {
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

      
      <Box>
        <StyledLoginMainContainer >          
          <Box>
            <Box>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="filled"
                value={loginData.email}
                onChange={handleLoginOnChange}
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
                value={loginData.password}
                variant="filled"
                onChange={handleLoginOnChange}
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
              <StyledLoginButton disabled={loginButtonDisabled} onClick={handleLogin} >LOG IN</StyledLoginButton>
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
                Don't have an account? 
              </Typography>

              <Button variant="text" onClick={handleNavigateToSignUp}>          
                SIGN UP
              </Button>
            </Box>
          </Box>

        </StyledLoginMainContainer>
      </Box>

    </Box>
  )
}

export default LoginMain