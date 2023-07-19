// import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
// Create a theme instance.

const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '62px',
    boardBarHeight: '68px'
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange
    //   }
    // }
  },
  // other properties
  components: {
    // Name of the component
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: () => {
          return {
            // color: theme.palette.primary.main,
            fontSize: '0.875rem'
          };
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: () => {
          return {
            // color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {
              // borderColor: theme.palette.primary.main
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                // borderColor: theme.palette.primary.main
              }
            },
            // fix vien cua input khi hover, tab
            '& fieldset': {
              borderWidth: '1px !important'
            },
            '&:hover fieldset': {
              borderWidth: '2px !important'
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px !important'
            }
          };
        }
      }
    }
  }
});

export default theme;