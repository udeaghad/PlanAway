import { styled } from '@mui/material/styles';
import theme from '../../theme/theme';


export const StyledLogo = styled("img")({
  width: "80%",
  [theme.breakpoints.up('laptop')]: {
    width: "40%",
  }
  
})

export const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "20%",
  [theme.breakpoints.up('tablet')]: {
    paddingTop: "10%",
  },
  [theme.breakpoints.up('laptop')]: {
    paddingTop: "5%",
  }

})
