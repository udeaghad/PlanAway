import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import theme from '../../theme/theme';
import { text } from 'stream/consumers';

export const StyledSaveItineraryButton = styled(Button)({
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

export const StyledViewMapButton = styled(Button)({
  variant: 'text',
  color: "inherit",
  size: "small",
  textTransform: "none",
  '&:hover': {
    backgroundColor: "inherit",
    color: theme.palette.secondary.variant,
  },
});


// export const StyledAddButton = styled(Button)({
//   variant: 'contained',
//   backgroundColor: theme.palette.primary.variant,
//   color: "#000000",
//   borderColor: '#000000',
//   borderRadius: 99,
//   '&:hover': {
//     backgroundColor: theme.palette.primary.main,    
//     boxShadow: '1px 1px 1px 1px #000000',
//   },
//   textTransform: 'none',
//   boxShadow: "1px 1px 1px 1px #000000"
// });

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
