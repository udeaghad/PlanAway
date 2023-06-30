import { styled, emphasize } from '@mui/material/styles';
import { Chip } from '@mui/material';
import theme from '../../theme/theme';

export const StyledBreadcrumb = styled(Chip)({
  backgroundColor: theme.palette.secondary.main,
  height: theme.spacing(3),
  color: "white",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize:"0.6rem",
  cursor: "pointer",
  '&:hover, &:focus': {
    backgroundColor: emphasize(theme.palette.secondary.variant, 0.06),
  },
  '&:active': {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(theme.palette.primary.main, 0.12),
  },
  [theme.breakpoints.up('tablet')]: {
    fontSize:"1rem",
  }

})  as typeof Chip;

export const StyledBreadcrumbsCont = styled("div")({
  backgroundColor: theme.palette.primary.variant,
  padding: "0.5rem",
})
