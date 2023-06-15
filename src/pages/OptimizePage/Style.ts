import { styled } from '@mui/material/styles';
import { Button, Paper, Box, Typography } from '@mui/material';
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


export const StyledMobileMap = styled(Box)({
  display: "block",
  [theme.breakpoints.up('tablet')]: {
    display: "none",
  },
})
export const StyledMap = styled(Box)({
  display: "none",
  [theme.breakpoints.up('tablet')]: {
    display: "block",
  },
})

export const StyledAddActivityCard = styled(Box)({
  margin: "0 5%",
  width: "90%",
  [theme.breakpoints.up('tablet')]: {
    margin: "0 1rem",
    width: "100%",
  },
  [theme.breakpoints.up('laptop')]: {
    width: "35%",
    marginLeft: "3%"
  }
})

export const StyledOriginCard = styled(Paper)({
  margin: "5%",
  padding: "3%",
  width: "90%",
  [theme.breakpoints.up('tablet')]: {
    width: "100%",
    margin: "2rem 1rem",
    padding: "0.5rem",
  },
  [theme.breakpoints.up('laptop')]: {
    width: "35%",
    marginLeft: "8%"
  }
})

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
})

export const StyledOriginActivityContainer = styled(Box)({
  display: "block",
  [theme.breakpoints.up('tablet')]: {
    display: "flex",
    
  },
  [theme.breakpoints.up('laptop')]: {
    // gap: "10%"
  }
})

export const StyledDragDropText = styled(Typography)({
  fontSize: "0.6rem",
  color: theme.palette.secondary.main,
 [theme.breakpoints.up('tablet')]: {
  fontSize: "1rem",
 }
})

export const StyledHelperTextContainer = styled(Box)({
  display: 'none',
  height: "2rem", 
  width: "100%", 
  backgroundColor: theme.palette.primary.variant,
  [theme.breakpoints.up('tablet')]: {
    display: 'flex',
  },
})

export const StyledDragDropContainer = styled(Box)({
  display: "block",
  width: "100%",
  [theme.breakpoints.up('tablet')]: {
    width: "80%",
  },
  [theme.breakpoints.up('laptop')]: {
    width: "40%",
    marginLeft: "8%"
  }
})

export const StyledDesktopMap = styled(Box)({
  margin: "0 5%",
  [theme.breakpoints.up('laptop')]: {
    width: "55%"
  }
})

export const StyledTopButton = styled(Box)({
  display: "none",
  [theme.breakpoints.only('tablet')]: {
    display: "flex", 
    justifyContent: "flex-end", 
    alignItems: "center"
  }
})

export const StyledActivityAndMapCont = styled(Box)({
  display: "block",
  [theme.breakpoints.up('laptop')]: {
    display: "flex",
    flexDirection: "row"
  }
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

export const StyledMobileBreadcrumbContainer = styled(Box)({
  display: 'none',
  [theme.breakpoints.only('mobile')]: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    gap: "2%",
    padding: "2%"
  },
})
