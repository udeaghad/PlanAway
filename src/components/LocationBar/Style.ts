import { styled } from '@mui/material/styles';
import {Box, Typography, Button} from '@mui/material';
import theme from '../../theme/theme';

export const StyledLocationBarContainer = styled(Box)({
  backgroundColor: theme.palette.primary.main,  
  padding: "3% 10%",
  [theme.breakpoints.up('tablet')]: {
    padding: "1% 10%",
  },
  [theme.breakpoints.up('laptop')]: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "baseline",
    padding: "0 5%",
    gap: "2rem"
  },
});

export const StyledLocationContainer = styled(Box)({
  [theme.breakpoints.up('laptop')]: {
    width: "30%",
  },
});

export const StyledSearchStack = styled("div")({  
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1rem",
  border: "1px black solid", 
  borderRadius: 99, 
  backgroundColor: "#fffef8", 
  padding: "1%",
  width: "100%",  
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

export const StyledDateStack = styled(Box)({ 
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "1rem",
  [theme.breakpoints.up('tablet')]: {
    flexDirection: "row",
    gap: "2rem"
  }

});

export const StyledButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5%",
  [theme.breakpoints.up('tablet')]: {
    justifyContent: "flex-end",
  }
})

export const StyleDateSection = styled(Box)({
  [theme.breakpoints.up('laptop')]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  }
}) 

export const StyledDateText = styled(Typography)({
  display: "none",
  [theme.breakpoints.up('laptop')]: {
    display: "block",
  }
})
