import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';
import theme from '../../theme/theme';


export const StyledMobileMap = styled(Box)({
  display: "block",
  [theme.breakpoints.up('tablet')]: {
    display: "none",
  },
})

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