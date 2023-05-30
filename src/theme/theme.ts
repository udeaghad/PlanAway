import * as React from 'react';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {

  interface PaletteColorOptions {
    main?: string;
    variant?: string;
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

    h5: {
      fontFamily: ['montserrat','sans-serif'].join(','),      
    }
    
  }
});

