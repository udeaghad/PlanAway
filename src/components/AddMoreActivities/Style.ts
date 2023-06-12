import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import theme from '../../theme/theme';

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