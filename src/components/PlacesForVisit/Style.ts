import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import theme from '../../theme/theme';


export const StyledRemoveButton = styled(Button)({
  variant: 'contained',
  backgroundColor: theme.palette.secondary.variant,
  color: "#000000",
  border: "1px solid #0095ab",
  padding: "0.6rem 0",
  borderRadius: 10,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,    
    boxShadow: 'none',
  },
  textTransform: 'none',
  boxShadow: "none"
});