import React from "react"
import { Provider } from "react-redux"
import store from "./src/state/createStore"
// import { ProductServiceProvider } from './src/product-service-context';
// import ProductService from './src/services/product-service';
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