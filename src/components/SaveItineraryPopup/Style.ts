import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import theme from '../../theme/theme';


export const StyledSaveItineraryButton = styled(Button)({
  variant: 'contained',
  backgroundColor: theme.palette.primary.variant,
  color: "#000000",
  borderColor: '#000000',
  borderRadius: 99,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,    
    boxShadow: '1px 1px 1px 1px #000000',
  },
  textTransform: 'none',
  boxShadow: "1px 1px 1px 1px #000000"
});

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
  padding: "0.5rem 1rem",
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
  padding: "0.5rem 1.5rem",
  ":disabled": {
    backgroundColor: "#F5F5F5",
    border: "2px solid #F5F5F5",
    color: "#000000",

  },
  //  ":active": {
  //   backgroundColor: "#ffc60b",
  //   color: "#000000",
  //   border: "2px solid #000000",
  //   borderRadius: 99,
  //  }
});