import { styled } from '@mui/material/styles';
import { Button, Paper, Box } from '@mui/material';
import theme from '../../theme/theme';


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

export const StyledOriginCard = styled(Paper)({
  margin: "5%",
  padding: "3%",
})

export const StyledMobileMap = styled(Box)({
  display: "block",
  [theme.breakpoints.up('tablet')]: {
    display: "none",
  },
})
