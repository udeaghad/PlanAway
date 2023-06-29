import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';
import theme from '../../theme/theme';


// export const StyledMobileMap = styled(Box)({
//   display: "block",
//   [theme.breakpoints.up('tablet')]: {
//     display: "none",
//   },
// })

export const StyledOriginCard = styled(Paper)({
  margin: "5%",
  padding: "3%",
  width: "90%",
  [theme.breakpoints.up('tablet')]: {
    width: "50%",
    margin: "2rem 1rem",
    padding: "0.5rem",
  },
  [theme.breakpoints.up('laptop')]: {
    width: "35%",
    marginLeft: "8%"
  }
})

export const StyledSavedTripsListCont = styled(Box)({
  margin: "2%",
  // height: "40vh",
  // overflow: "scroll",
})

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
})

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

export const StyledActivityAndMapCont = styled(Box)({
  display: "block",
  [theme.breakpoints.up('laptop')]: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "8%"
  }
})

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

export const StyledTopButton = styled(Box)({
  display: "none",
  [theme.breakpoints.only('tablet')]: {
    display: "flex", 
    justifyContent: "flex-end", 
    alignItems: "center"
  }
})