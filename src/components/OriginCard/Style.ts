import { styled} from '@mui/material/styles';
import { Typography } from '@mui/material';
import theme from '../../theme/theme';

export const StyledLocationNameText = styled(Typography)({
<<<<<<< HEAD
    fontWeight: "bold",
  color: "#000000",
})

export const StyledLocationAddressText = styled(Typography)({  
  color: "#000000",  
=======
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
>>>>>>> 450b6784d949c9a77b90dfe073e2a7bb861fd20f
})