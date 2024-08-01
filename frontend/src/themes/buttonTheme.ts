import { createTheme } from '@mui/material/styles';

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#1d4ed8', // Flowbite primary blue
      contrastText: '#ffffff', // White text
    },
    secondary: {
      main: '#d97706', // Flowbite secondary orange
      contrastText: '#ffffff', // White text
    },
  },
  typography: {
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
          fontWeight: 600, // Flowbite's font-semibold
          textTransform: 'none', // Remove uppercase transformation
        },
        containedPrimary: {
          backgroundColor: '#1d4ed8', // Flowbite primary blue
          color: '#ffffff', // White text
          '&:hover': {
            backgroundColor: '#1e40af', // Darker blue on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#d97706', // Flowbite secondary orange
          color: '#ffffff', // White text
          '&:hover': {
            backgroundColor: '#b45309', // Darker orange on hover
          },
        },
      },
    },
  },
});

export default buttonTheme;
