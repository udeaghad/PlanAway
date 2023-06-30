import { Box } from '@mui/material'
import {styled} from '@mui/material/styles'
import theme from '../../theme/theme'

export const MenuContainer = styled(Box)({
  display: 'none',
  [theme.breakpoints.only('mobile')]: {
    display: 'flex',
  },
})

export const StyledImg = styled('img')({
  width: "90px",
 
  [theme.breakpoints.up('tablet')]: {
    width: "150px",
  },
  [theme.breakpoints.up('laptop')]: {
    width: "200px",
  },
})

export const OtherDeviceMenu = styled(Box)({
  display: "none",

  [theme.breakpoints.up('tablet')]: {
    display: 'block',
  },
})

