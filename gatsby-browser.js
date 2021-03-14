import React from "react";
import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import Layout from './src/components/layout'
import ReactDOM from 'react-dom'
import theme from './src/theme';
import stylesProviderProps from "material-ui-plugin-cache-endpoint";

import { hasEntries } from "./src/utils";
import { CssBaseline } from "@material-ui/core";
import { loadableReady } from "@loadable/component";

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

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    loadableReady(() => {
      console.log("rendering!");
      ReactDOM.render(element, container, callback);
    });
  };
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
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Приложение Свисни суши было обновлено. `+
    `Перезагрузить, чтобы отобразить последнюю версию?`
  )
  if (answer === true) {
    window.location.reload()
  }
}

// export const onServiceWorkerUpdateReady = () => {
//   if(typeof window !== 'undefined') {
//     if (
//       window.confirm(
//         "Cайт был обновлен. Вы хотите перезагрузить сайт, чтобы получить новые товары?"
//       )
//     ) {
//       window.location.reload(true);
//     }
//   }
// };







// =====================================================
// import React from 'react'
// import ReactDOM from 'react-dom'
// import Layout from './src/components/layout'
//
// import { JssProvider } from 'react-jss';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import {
//   createMuiTheme,
//   createGenerateClassName,
//   MuiThemeProvider,
//   jssPreset,
// } from '@material-ui/core/styles';
// import { create } from 'jss';
// import theme from './src/theme';
// import stylesProviderProps from "material-ui-plugin-cache-endpoint";
//
// export const replaceHydrateFunction = () => {
//   return (element, container, callback) => {
//     console.log("rendering!");
//     ReactDOM.render(element, container, callback);
//   };
// };
//
//
// const jss = create({
//   ...jssPreset(),
//   // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
//   insertionPoint: 'jss-insertion-point',
// });
//
// // Add the JSS insertion point comment to the top of the head.
// export const onClientEntry = () => {
//   const styleNode = window.document.createComment('jss-insertion-point');
//   window.document.head.insertBefore(styleNode, window.document.head.firstChild);
// };
//
// // Remove the server-side injected CSS.
// export const onInitialClientRender = () => {
//   const ssStyles = window.document.getElementById('server-side-jss');
//   ssStyles && ssStyles.parentNode.removeChild(ssStyles);
// };
//
// const defaultOptions = {
//   theme,
//   dangerouslyUseGlobalCSS: false,
//   productionPrefix: 'jss',
// };
//
// export const wrapRootElement = ({ element }, options) => {
//   const { dangerouslyUseGlobalCSS, productionPrefix, theme } = {
//     ...defaultOptions,
//     ...options,
//   };
//
//   const generateClassName = createGenerateClassName({
//     dangerouslyUseGlobalCSS,
//     productionPrefix,
//   });
//
//   return (
//     <JssProvider jss={jss} generateClassName={generateClassName}>
//       <MuiThemeProvider theme={createMuiTheme(theme)}>
//         <CssBaseline />
//         {element}
//       </MuiThemeProvider>
//     </JssProvider>
//   );
// };
//
// export const wrapPageElement = ({ element, props }) => {
//  return (
//     <Layout {...props}>{element}</Layout>
//  );
// };
//
// export const onServiceWorkerUpdateReady = () => {
//   if(typeof window !== 'undefined') {
//     if (
//       window.confirm(
//         "Cайт был обновлен. Вы хотите перезагрузить сайт, чтобы получить новые товары?"
//       )
//     ) {
//       window.location.reload(true);
//     }
//   }
// };
// =====================================================
// import { ThemeProvider } from '@material-ui/styles';

// export const wrapRootElement = ({ element }) => {
//  return (
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     {element}
//   </ThemeProvider>
//  );
// };

