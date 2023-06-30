import { styled } from '@mui/material/styles';
import { Button} from '@mui/material';
import theme from '../../theme/theme';

export const StyledViewMapButton = styled(Button)({
  variant: 'text',
  color: "inherit",
  size: "small",
  textTransform: "none",
  '&:hover': {
    backgroundColor: "inherit",
    color: theme.palette.secondary.variant,
  },
  marginRight: "0.25rem",
  [theme.breakpoints.up('tablet')]: {
    display: "none",
  }
 
});

export const StyledViewMapBtnUpTab = styled(Button)({
  display: "none",
  [theme.breakpoints.up('tablet')]: {
    display: "block",
    variant: 'text',
    color: "inherit",
    size: "small",
    textTransform: "none",
    '&:hover': {
      backgroundColor: "inherit",
      color: theme.palette.secondary.variant,
    },
    marginRight: "0.25rem",
  }
});