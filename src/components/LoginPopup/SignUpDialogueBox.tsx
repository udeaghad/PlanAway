import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { StyledCancelButton,StyledLoginButton } from './Style';

interface SignUpDialogueBoxProps {
  openSignUp: boolean;
  handleCloseSignUpDialogue: () => void;
  handleSignUpOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  signUpButtonDisabled: boolean;
  handleSignUp: () => void;
  handleClickOpen: () => void;
}

const SignUpDialogueBox = ({openSignUp, handleCloseSignUpDialogue, handleSignUpOnChange, signUpButtonDisabled, handleSignUp, handleClickOpen }:SignUpDialogueBoxProps ) => {
  return (
    <div>
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
            autoComplete="current-password"
            onChange={handleSignUpOnChange}
          />

          <TextField            
            margin="dense"
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            variant="standard"
            onChange={handleSignUpOnChange}
          />
          <TextField            
            margin="dense"
            id="passwordConfirm"
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
          <StyledLoginButton disabled={signUpButtonDisabled} onClick={handleSignUp}>CREATE ACCOUNT</StyledLoginButton>
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