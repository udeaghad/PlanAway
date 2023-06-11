import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import theme from '../../theme/theme';

export const StyledContainer = styled(Box)({
  backgroundImage: `url(/images/activity-background.png)`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '50vh',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  boxShadow: "1px 1px 1px 1px #000000"
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
})

export const StyledSearchBoxContainer = styled(Box)({
 
})

export const StyledSuggestionsContainer = styled(Box)({
  display: "none",
  [theme.breakpoints.up('tablet')]: {
    display: "flex",
    
  }
})

export const StyledMobileSuggestionsContainer = styled(Box)({
  display: "none",
  [theme.breakpoints.up('mobile')]: {
    display: "block",
    width: "100%",
    
  }
})
