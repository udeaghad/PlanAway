import { styled } from '@mui/material/styles';
import { Button} from '@mui/material';
import theme from '../../theme/theme';

export const StyledButton = styled(Button)({
  backgroundColor: "white",
  color: "#000000",
  borderColor: theme.palette.primary.variant,
  border: "2px solid  #fdd036",
  borderRadius: 99,
  boxShadow: 'none',  
  '&:hover': {
    backgroundColor: theme.palette.primary.main,    
    
  },
  textTransform: 'none',
  '&:active': {
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.variant,
  },
});