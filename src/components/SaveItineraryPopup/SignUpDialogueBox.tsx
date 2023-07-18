import React from 'react';
import {
  Box, 
  Backdrop, 
  CircularProgress, 
  Typography, 
  Button, 
  TextField, 
  Dialog, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  DialogActions } from '@mui/material';

import { StyledCancelButton,StyledLoginButton } from './Style';

interface SignUpDialogueBoxProps {
  openSignUp: boolean;
  handleCloseSignUpDialogue: () => void;
  handleSignUpOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  signUpButtonDisabled: boolean;
  handleSignUp: () => void;
  handleClickOpen: () => void;
  openBackDropSignUp: boolean;
}

const SignUpDialogueBox = (
  { openSignUp, 
    handleCloseSignUpDialogue, 
    handleSignUpOnChange, 
    signUpButtonDisabled, 
    handleSignUp, 
    handleClickOpen,
    openBackDropSignUp }:SignUpDialogueBoxProps ) => {
  return (
    <div>

      <Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDropSignUp }
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Dialog open={openSignUp} onClose={handleCloseSignUpDialogue}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <DialogTitle>Create Account</DialogTitle>
        </div>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            autoComplete="email"
            onChange={handleSignUpOnChange}
          />

          <TextField            
            margin="dense"
            id="password"
            label="Password"
            type="password"
            autoComplete="password"
            fullWidth
            variant="standard"
            onChange={handleSignUpOnChange}
            data-testid='password'
          />
          <TextField            
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            variant="standard"
            onChange={handleSignUpOnChange}
          />
        </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem"}}>
          <StyledCancelButton onClick={handleCloseSignUpDialogue}>CANCEL</StyledCancelButton>
          <StyledLoginButton disabled={signUpButtonDisabled} onClick={handleSignUp}>SIGN UP</StyledLoginButton>
        </DialogActions> 

        <DialogContentText sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", m: "1rem"}}>
          <Typography variant="subtitle1">
            Already have an account? 
          </Typography>

          <Button variant="text" onClick={handleClickOpen}>          
            Log In
          </Button>
          
        </DialogContentText> 
      </Dialog>
    </div>
  )
}

export default SignUpDialogueBox