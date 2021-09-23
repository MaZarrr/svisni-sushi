import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Layout from './src/components/layout'
import theme from './src/theme';
import { CssBaseline } from '@material-ui/core';
// import ReactDOM from "react-dom"

import { ApolloWrapper } from "./src/gatsby-theme-apollo/ApolloWrapper"

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>{element}</Layout>
  );
};

export const wrapRootElement = ({ element }) => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloWrapper>
          {element}
        </ApolloWrapper>
      </ThemeProvider>
    )
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Приложение Свисни суши было обновлено. `+
    `Перезагрузить, чтобы отобразить последнюю версию?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

// export const replaceHydrateFunction = () => {
//   return (element, container, callback) => {
//     console.log("rendering!");
//     // ReactDOM.render(element, container, callback);
//     ReactDOM.hydrate(element, container, callback);
//   };
// };
