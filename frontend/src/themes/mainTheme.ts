import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#1d4ed8', // Flowbite primary blue
      contrastText: '#ffffff', // White text
    },
    secondary: {
      main: '#d97706', // Flowbite secondary orange
      contrastText: '#ffffff', // White text
    },
    background: {
      default: '#f8fafc', // Flowbite background color
      paper: '#ffffff', // White paper background
    },
    text: {
      primary: '#1e293b', // Flowbite primary text color
      secondary: '#64748b', // Flowbite secondary text color
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Flowbite font
    h1: {
      fontSize: '2.25rem', // 36px
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.875rem', // 30px
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.375rem', // Flowbite's rounded-md
          padding: '0.5rem 1rem', // Flowbite's py-2 px-4
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '1rem', // Adjust the padding as needed
        },
      },
    },
  },
});

export default mainTheme;
