import { createMuiTheme } from '@material-ui/core/styles'

import { Colors } from 'constants/colors'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: Colors.lightGrey,
      main: Colors.grey,
      dark: Colors.darkGrey,
      contrastText: Colors.white,
    },
    secondary: {
      light: Colors.lightCyan,
      main: Colors.cyan,
      dark: Colors.darkCyan,
      contrastText: Colors.white,
    },
  }
})
