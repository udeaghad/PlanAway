import { styled} from '@mui/material/styles';
import { Typography } from '@mui/material';
import theme from '../../theme/theme';

export const StyledLocationNameText = styled(Typography)({
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#000000",
  [theme.breakpoints.up('laptop')]: {
    fontSize: "1.2rem",
  },
})

export const StyledLocationAddressText = styled(Typography)({
  fontSize: "0.65rem",
  color: "#000000",
  [theme.breakpoints.up('laptop')]: {
    fontSize: "0.8rem",
  },
})