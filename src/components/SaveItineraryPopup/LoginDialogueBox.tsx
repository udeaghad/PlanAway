import React from 'react';
import {Box, Backdrop, CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

import { StyledCancelButton, StyledLoginButton } from './Style';

interface LoginDialogueBoxProps {
  open: boolean;
  handleClose: () => void;
  handleLoginOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loginButtonDisabled: boolean;
  handleLogin: () => void;
  handleOpenSignUpDialogue: () => void;
  openBackDropLogin: boolean
}

const LoginDialogueBox = ({open, handleClose, handleLoginOnChange, loginButtonDisabled, handleLogin,handleOpenSignUpDialogue, openBackDropLogin}: LoginDialogueBoxProps ) => {
  return (
    <div>
      <Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackDropLogin}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
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
            autoComplete="email"
            onChange={handleLoginOnChange}
          />

          <TextField            
            margin="dense"
            data-testid='password'
            id="password"
            label="Password"
            type="password"
            autoComplete="password"
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