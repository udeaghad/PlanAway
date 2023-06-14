import { styled } from '@mui/material/styles';
import theme from '../../theme/theme';


export const StyledRemoveButton = styled('button')({  
  backgroundColor: theme.palette.secondary.variant,
  color: "#000000",
  border: "2px solid #000000",
  padding: "0.5rem",
  borderRadius: 10,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,    
    boxShadow: '0.8px 0.8px 0.8px 0.8px #000000',
  },
  textTransform: 'none',
  boxShadow: "0.8px 0.8px 0.8px 0.8px #000000",
});