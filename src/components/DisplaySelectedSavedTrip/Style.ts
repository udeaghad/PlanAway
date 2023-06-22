import { styled } from '@mui/material/styles';
import { Button, Paper, Box, Typography } from '@mui/material';
import theme from '../../theme/theme';


export const StyledMobileMap = styled(Box)({
  display: "block",
  [theme.breakpoints.up('tablet')]: {
    display: "none",
  },
})

export const StyledJumpCont = styled(Box)({
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "flex-end", 
  marginLeft: "5%",
  width: "90%",
  marginBottom: "1%",
  [theme.breakpoints.up('laptop')]: {
    width: "40%",
    marginLeft: "8%"
  }
})

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

export const StyledDesktopMap = styled(Box)({
  margin: "0 5%",
  [theme.breakpoints.up('laptop')]: {
    width: "55%"
  }
});

export const StyledMap = styled(Box)({
  display: "none",
  [theme.breakpoints.up('tablet')]: {
    display: "block",
  },
});

export const StyledActivityAndMapCont = styled(Box)({
  display: "block",
  [theme.breakpoints.up('laptop')]: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "8%"
  }
})

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
})

export const StyledTopButton = styled(Box)({
  display: "none",
  [theme.breakpoints.only('tablet')]: {
    display: "flex", 
    justifyContent: "flex-end", 
    alignItems: "center"
  }
})