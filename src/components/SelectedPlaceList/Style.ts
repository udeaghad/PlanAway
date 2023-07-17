import { Button, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../../theme/theme';

export const StyledRemoveButton = styled(Button)({
  backgroundColor: theme.palette.secondary.variant,
  color: "#000000",
  borderColor: '#000000',
  borderRadius: 99,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,    
   
  },
  textTransform: 'none',
  
});

export const StyledMobileremoveBtn = styled("button")({
  backgroundColor: theme.palette.secondary.variant,
  border: "1px solid #13adc1", 
  borderRadius:"10px", 
  padding: "0.25rem", 
  cursor: "pointer"
});

export const StyledCard = styled(Card)({
  width: "85%",
  [theme.breakpoints.up('tablet')]: {
    width: "65%",
  }
})