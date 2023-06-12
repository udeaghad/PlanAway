import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme from '../../theme/theme';

export const StyledAddedActivityContainer = styled(Box)({
  backgroundImage: `url(/images/activity-background.png)`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '40vh',
  position: 'relative',
  display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  flexDirection: 'column',
  
})

export const StyledOptimizeButton = styled(Button)({
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
  boxShadow: "1px 1px 1px 1px #000000",
  fontSize: "0.7rem",
});

export const StyledHelperTextContainer = styled(Box)({
  display: 'none',
  height: "2rem", 
  width: "100%", 
  backgroundColor: theme.palette.primary.variant,
  [theme.breakpoints.up('tablet')]: {
    display: 'flex',
  },

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

export const StyledOriginBoxContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "1rem 0",
  [theme.breakpoints.up('tablet')]: {
    width: "50%",
  }
})

export const StyledSearchBoxContainer = styled(Box)({
  margin: "1rem 0",
  [theme.breakpoints.up('tablet')]: {
    width: "50%",
  }
 
})

export const StyledSuggestionsContainer = styled(Box)({
  display: "none",
  [theme.breakpoints.up('laptop')]: {
    display: "block",
    
  }
})

export const StyledMobileSuggestionsContainer = styled(Box)({
  display: "none",
  [theme.breakpoints.up('mobile')]: {
    display: "block",
    width: "100%",
  },
  [theme.breakpoints.up('laptop')]: {
    display: "none"
  }
})

export const StyledLaptopActivity =styled(Box)({
  display: 'none',
  [theme.breakpoints.up('laptop')]: {
    display: 'block'
  }
})

export const StyledMobileActivity = styled(Box)({
  display: "none",
  backgroundColor: "white",
  [theme.breakpoints.up('mobile')]: {
    display: "block"
  },
  [theme.breakpoints.up('laptop')]: {
    display: "none"
  }
  
})

export const StyledActivityCard = styled(Box)({
  display: 'none',
  [theme.breakpoints.up('laptop')]: {
    display: 'block',
  }
})

export const StyledMobileActivityCard = styled(Box)({
  display: 'none',
  [theme.breakpoints.up('mobile')]: {
    display: 'block',
  },
  [theme.breakpoints.up('laptop')]: {
    display: 'none',
  }
})

export const StyledDeviceLayout = styled(Box)({
  display: "block",
  [theme.breakpoints.up('tablet')]: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",  
  },
  [theme.breakpoints.up('laptop')]: {
    display: "block",
  }
})

export const StyledLayout = styled(Box)({
  display: "block",
  [theme.breakpoints.up('laptop')]: {
    display: "flex",
    flexDirection: "row",
  }
})

export const StyledDivisionOne = styled(Box)({
  width: "100%",
  [theme.breakpoints.up('laptop')]: {
    width: "60%",
  }
})

export const StyledDivisionTwo = styled(Box)({
  width: "100%",
  [theme.breakpoints.up('laptop')]: {
    width: "40%",
  }
})
