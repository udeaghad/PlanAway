import { styled } from '@mui/material/styles';
import {Box, Grid, Stack, Typography, Button} from '@mui/material';
import theme from '../../theme/theme';

export const StyledLocationBarContainer = styled(Box)({
  backgroundColor: theme.palette.primary.main,
  flexGrow: 1, 
  marginTop: "0.5rem", 
  padding: "1.5rem", 
  height: "8.75rem",
  display: "flex",
  
});

export const StyledLocationGridContainer = styled(Grid)({
  spacing: 2,
  display: "flex", 
  justifyContent: "space-around", 
  alignItems: "center",

});

export const StyledSearchStack = styled(Stack)({  
  marginLeft: "20%",
  border: "1px black solid", 
  borderRadius: 99, 
  backgroundColor: "#fffef8", 
  padding: "10px",
  width: "80%",  
});

export const StyledButton = styled(Button)({
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
  
