import React from 'react'
import { Box, TextField, Typography, Button } from '@mui/material';
import { StyledCancelButton, StyledLoginButton } from './Style';

interface SignUpFormProps {
  handleSignUpOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  signUpButtonDisabled: boolean;
  handleSignUp: () => void;
  handleNavigateToLogin: () => void;
}

const SignUpForm = ({handleSignUpOnChange, handleClose, signUpButtonDisabled, handleSignUp, handleNavigateToLogin}: SignUpFormProps) => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          // '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem"
        }}
        // noValidate
        // autoComplete="off"
      >
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="filled"
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
          onChange={handleSignUpOnChange}
          sx={{
            backgroundColor: "white"
          }}
        />

        <TextField            
          margin="dense"
          id="confirmPassword"
          label="Re-enter Password"
          type="confirmPassword"
          autoComplete="current-password"
          fullWidth
          variant="filled"
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
          Login
        </Button>
      </Box>
      <Box>

      </Box>
    </div>
  )
}

export default SignUpForm