import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import theme from '../../theme/theme';


export const StyledCancelButton = styled(Button)({
  variant: 'contained',
  backgroundColor: "white",
  color: "#000000",
  border: "2px solid #ffc60b",
  borderRadius: 99,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main, 
    borderColor: theme.palette.secondary.main,   
  },
  textTransform: 'none', 
  padding: "0.5rem 0.5rem",
  [theme.breakpoints.up('tablet')]: {
    padding: "0.5rem 1rem",
  },

});

export const StyledLoginButton = styled(Button)({
  variant: 'contained',
  backgroundColor: "#ffc60b",
  color: "#000000",
  border: "2px solid #000000",
  borderRadius: 99,
  '&:hover': {
    backgroundColor: theme.palette.primary.main, 
    borderColor: "#000000",   
  },
  textTransform: 'none', 
  padding: "0.5rem 1rem",
  ":disabled": {
    backgroundColor: "#F5F5F5",
    border: "2px solid #F5F5F5",
    color: "#000000",
  },
  [theme.breakpoints.up('tablet')]: {
    padding: "0.5rem 1.5rem",
  },
});

export const StyledLoginMainContainer = styled(Box)({
  
  [theme.breakpoints.up('mobile')]: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  [theme.breakpoints.up('tablet')]: {
    width: "100%",
  }


});