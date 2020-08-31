import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from 'ducks/rootReducer'

export const store = configureStore({
  reducer: rootReducer,
})

// Enabling hot module replacement
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('ducks/rootReducer', () => {
    const newRootReducer = require('ducks/rootReducer').rootReducer

    store.replaceReducer(newRootReducer)
  })
}
