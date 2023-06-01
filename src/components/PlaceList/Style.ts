import { Button } from '@mui/material';
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