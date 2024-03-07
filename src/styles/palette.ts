import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#315D9F',
      light: '#e3f2fd',
      dark: '#42a5f5'
    },
    secondary: {
      main: '#a7d9ff',
      light: '#ce93d8',
      dark: '#ab47bc'
    },
    info: {
      main: '#43A2EF',
      light: '#a7d9ff',
      dark: '#0288d1'
    },
    error: {
      main: '#f44336',
      light: '#66bb6a',
      dark: '#388e3c'
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c'
    }
  }
});
