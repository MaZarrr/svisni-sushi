import React from "react";
import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import Layout from './src/components/layout'
import theme from './src/theme';
import stylesProviderProps from "material-ui-plugin-cache-endpoint";
// import ReactDOM from 'react-dom'

import { hasEntries } from "./src/utils";
import { CssBaseline } from "@material-ui/core";

export const onInitialClientRender = () => {
  if (process.env.BUILD_STAGE === `develop`) {
    return;
  }

  // Remove the server-side injected CSS.
  const jssStyles = document.querySelector(`#jss-server-side`);
  if (jssStyles) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
};

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>{element}</Layout>
  );
};

export const wrapRootElement = ({ element }, pluginOptions) => {
  if (hasEntries(stylesProviderProps) && pluginOptions.stylesProvider) {
    throw new Error(
      `You specified both pathToStylesProvider and stylesProvider in gatsby-config.js. Remove one of them.`,
    );
  }

  const stylesProvider = hasEntries(stylesProviderProps)
    ? stylesProviderProps
    : pluginOptions.stylesProvider;

  if (!stylesProvider) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {element}
      </ThemeProvider>
    )
  }

  return <StylesProvider {...stylesProvider}>{element}</StylesProvider>;
}

// export const replaceHydrateFunction = () => {
//   return (element, container, callback) => {
//     console.log("rendering!");
//     ReactDOM.render(element, container, callback);
//   };
// };
//
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Приложение Свисни суши было обновлено. `+
    `Перезагрузить, чтобы отобразить последнюю версию?`
  )
  if (answer === true) {
    window.location.reload()
  }
}