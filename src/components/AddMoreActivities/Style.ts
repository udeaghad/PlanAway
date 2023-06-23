import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import theme from '../../theme/theme';

export const StyledRemoveButton = styled("button")({
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

export const StyledDragDropText = styled(Typography)({
  fontSize: "0.6rem",
  color: theme.palette.secondary.main,
 [theme.breakpoints.up('tablet')]: {
  fontSize: "0.6rem",
 }
})