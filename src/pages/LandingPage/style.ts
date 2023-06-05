import { styled } from '@mui/material/styles';
import { Box } from '@mui/material'; 
import theme from '../../theme/theme'; 


export const StyledContainer = styled(Box)({
  backgroundImage: `url(/images/croppedBackground.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '55vh',
  [theme.breakpoints.up('tablet')]: {
    height: "75vh",
   },
  [theme.breakpoints.up('laptop')]: {
    height: "100vh",
    },

})

export const StyledProgressBar = styled('div')({
  display: "none",
  [theme.breakpoints.up('tablet')]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})

