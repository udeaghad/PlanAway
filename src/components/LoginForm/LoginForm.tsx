import React from 'react'
import { Box, TextField, Typography, Button } from '@mui/material';
import { StyledCancelButton, StyledLoginButton } from './Style';

interface LoginFormProps {
  handleLoginOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  loginButtonDisabled: boolean;
  handleLogin: () => void;
  handleNavigateToSignUp: () => void;
}

const LoginForm = ({handleLoginOnChange, handleClose, loginButtonDisabled, handleLogin, handleNavigateToSignUp}:LoginFormProps) => {
  return (
    <div>
      <Box>
      <TextField
        autoFocus
        margin="dense"
        id="email"
        label="Email Address"
        type="email"
        fullWidth
        variant="filled"
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
    <Box>

    </Box>
    </div>
  )
}

export default LoginForm