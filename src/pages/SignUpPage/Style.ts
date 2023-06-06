import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import theme from '../../theme/theme';
import { NavLink } from 'react-router-dom';


export const StyledContainer = styled("div")({
  backgroundImage: `url(/images/login-background.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100vh',
  position: 'relative',
  
})

export const LocationContainer = styled('div')({
  diplay: 'block',
  [theme.breakpoints.only('mobile')]: {
    display: 'none'
  },
})

export const StyledNavLink = styled(NavLink)({
  display: 'none',
  [theme.breakpoints.only('mobile')]: {
    display: 'block',
    color: "black",
  },
})