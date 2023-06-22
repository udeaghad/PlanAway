import { styled } from '@mui/material/styles';
import { Button, Paper, Box, Typography } from '@mui/material';
import theme from '../../theme/theme';


export const StyledMobileMap = styled(Box)({
  display: "block",
  [theme.breakpoints.up('tablet')]: {
    display: "none",
  },
})