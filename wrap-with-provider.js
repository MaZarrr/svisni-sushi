import React from "react"
import { Provider } from "react-redux"
import store from "./src/state/createStore"
import ErrorBoundary from './src/components/error-boundary/error-boundary';

export default ({ element }) => {

  return (
  <Provider store={store}>
  <ErrorBoundary>
      {element}
  </ErrorBoundary>
  </Provider>
  )
}