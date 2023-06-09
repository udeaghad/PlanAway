import { styled } from '@mui/material/styles';
import { Button, Box,Stack } from '@mui/material';
import theme from '../../theme/theme';

export const StyledAddButton = styled(Button)({
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

export const StyledRemoveButton = styled(Button)({
  variant: 'contained',
  backgroundColor: theme.palette.secondary.variant,
  color: "#000000",
  borderColor: '#000000',
  borderRadius: 99,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,    
    boxShadow: '1px 1px 1px 1px #000000',
  },
  textTransform: 'none',
  boxShadow: "1px 1px 1px 1px #000000"
});

export const StyledActivityCard = styled(Box)({
  display: "none",
  [theme.breakpoints.up('laptop')]: {
    display: "block",
  }
})

export const StyledMobileRemoveBtn = styled("button")({
  backgroundColor: theme.palette.secondary.variant,
  border: "1px solid #13adc1", 
  boxShadow: "1px 1px 1px 1px #000000",
  borderRadius:"10px", 
  padding: "0.25rem", 
  cursor: "pointer",
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,    
    boxShadow: '1px 1px 1px 1px #000000',
  },
});

export const StyledMobileAddBtn = styled("button")({
  backgroundColor: theme.palette.primary.variant,
  border: "1px solid black",
  boxShadow: "1px 1px 1px 1px #000000", 
  borderRadius:"10px", 
  padding: "0.25rem", 
  cursor: "pointer",
  '&:hover': {
    backgroundColor: theme.palette.primary.main,    
    boxShadow: '1px 1px 1px 1px #000000',
  },
});

export const StyledMobileCard = styled(Box)({
  display: "flex", 
  margin: "1rem",
  [theme.breakpoints.up('laptop')]: {
    display: "none",
  }
})

export const StyledSearchBoxContainer = styled(Stack)({
  border: "2px black solid", 
  borderRadius: 99, 
  padding: "0.3rem", 
  ml: "4%",
  width: "90%",
  [theme.breakpoints.up('laptop')]: {
    padding: "0.5rem",
  }

})
