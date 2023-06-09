import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {

  interface PaletteColorOptions {
    main?: string;
    variant?: string;
  }

  interface PaletteColor {
    main: string;
    variant: string;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}



const theme = createTheme({
  palette: {
    primary: {
      main: '#fdd036',
      variant: '#ffc60b',
    },
    secondary: {
      main: '#13adc1', 
      variant: '#0095a8',
    },
  },

  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),

    h6: {
      fontFamily: ['montserrat','sans-serif'].join(','), 
      fontWeight: 700,
      fontSize: '1.25rem', 
      fontStyle: 'normal',
      lineHeight: '1.5rem',
      border: '1px solid #000000',
      textShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)',
      textTransform: 'none',
    },

    subtitle1: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '1rem',
      lineHeight: "1.25rem",
      color: "#000000",    
    },

    body1: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.25rem',
      color: '#49454F',
    }
  },

  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export default theme;