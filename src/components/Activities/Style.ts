import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
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
  borderRadius:"10px", 
  padding: "0.25rem", 
  cursor: "pointer"
});
export const StyledMobileAddBtn = styled("button")({
  backgroundColor: theme.palette.primary.variant,
  border: "1px solid #13adc1", 
  borderRadius:"10px", 
  padding: "0.25rem", 
  cursor: "pointer"
});