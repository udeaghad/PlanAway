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

interface LoginDialogueBoxProps {
  open: boolean;
  handleClose: () => void;
  handleLoginOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loginButtonDisabled: boolean;
  handleLogin: () => void;
  handleOpenSignUpDialogue: () => void;
}

const LoginDialogueBox = ({open, handleClose, handleLoginOnChange, loginButtonDisabled, handleLogin,handleOpenSignUpDialogue}: LoginDialogueBoxProps ) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <DialogTitle>Log In</DialogTitle>
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
            onChange={handleLoginOnChange}
          />

          <TextField            
            margin="dense"
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            variant="standard"
            onChange={handleLoginOnChange}
          />
        </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem"}}>
          <StyledCancelButton onClick={handleClose}>CANCEL</StyledCancelButton>
          <StyledLoginButton disabled={loginButtonDisabled} onClick={handleLogin} >LOG IN</StyledLoginButton>
        </DialogActions>
        <DialogContentText sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", m: "1rem"}}>
          <Typography variant="subtitle1">
            Don't have an account? 
          </Typography>

          <Button variant="text" onClick={handleOpenSignUpDialogue}>          
            SIGN UP
          </Button>
          
        </DialogContentText>
      </Dialog>

    </div>
  )
}

export default LoginDialogueBox