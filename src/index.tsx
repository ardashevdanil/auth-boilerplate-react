import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'

import * as serviceWorker from './serviceWorker'
import { store } from 'ducks/store'
import { theme } from 'utils/muiTheme'
import { globalStyles } from 'constants/globalStyles'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const render = () => {
  const App = require('components/App').App

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={{ palette: theme.palette }}>
            <Global styles={globalStyles} />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </MuiThemeProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render()

// Enabling hot module replacement
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('components/App', render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
