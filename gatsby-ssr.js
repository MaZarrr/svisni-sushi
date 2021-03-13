import React from "react";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import CleanCSS from "clean-css";
import Layout from './src/components/layout'
import theme from './src/theme';
import stylesProviderProps from "material-ui-plugin-cache-endpoint";

import { hasEntries } from "./src/utils";
// import autoprefixer from "./src/autoprefixer";
import { CssBaseline } from "@material-ui/core";

// Keep track of sheets for each page
const globalLeak = new Map();
const cleanCSS = new CleanCSS();

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>{element}</Layout>
  );
};

export const wrapRootElement = ({ element, pathname }, pluginOptions) => {
  if (hasEntries(stylesProviderProps) && pluginOptions.stylesProvider) {
    throw new Error(
      `You specified both pathToStylesProvider and stylesProvider in gatsby-config.js. Remove one of them.`,
    );
  }

  const stylesProvider = hasEntries(stylesProviderProps)
    ? stylesProviderProps
    : pluginOptions.stylesProvider;

  const sheets = new ServerStyleSheets(stylesProvider);
  globalLeak.set(pathname, sheets);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {sheets.collect(element)}
    </ThemeProvider>
    )
};

export const onRenderBody = (
  { setHeadComponents, pathname },
  { disableMinification = false },
) => {
  const sheets = globalLeak.get(pathname);

  if (!sheets) {
    return;
  }

  let css = sheets.toString();

  // css = disableAutoprefixing ? css : autoprefixer(css, pathname);
  css = disableMinification ? css : cleanCSS.minify(css).styles;

  setHeadComponents([
    <style
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{ __html: css }}
    />,
    <script
      key="vk-retargeting"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
                !function(){
                var t=document.createElement("script");
                t.type="text/javascript",
                t.async=!0,
                t.src="https://vk.com/js/api/openapi.js?168",
                t.onload=function(){
                    VK.Retargeting.Init("VK-RTRG-493440-aoKed"),
                    VK.Retargeting.Hit()
                    }, document.head.appendChild(t)}();
                `
      }}/>,
    <script key="talk-me" type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `
                   (function(d, w, m) {
                    window.supportAPIMethod = m;
                    var s = d.createElement('script');
                    s.type ='text/javascript'; s.id = 'supportScript'; s.charset = 'utf-8';
                    s.async = true;
                    var id = '226d519661c50fd5e16477daf16d89eb';
                    s.src = 'https://lcab.talk-me.ru/support/support.js?h='+id;
                    var sc = d.getElementsByTagName('script')[0];
                    w[m] = w[m] || function() { (w[m].q = w[m].q || []).push(arguments); };
                    if (sc) sc.parentNode.insertBefore(s, sc);
                    else d.documentElement.firstChild.appendChild(s);
                  })(document, window, 'TalkMe');
                `
            }}
    />
  ]);

  globalLeak.delete(pathname);
};


















// import React from 'react'
// import Layout from './src/components/layout'
// import { JssProvider, SheetsRegistry } from 'react-jss';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import theme from './src/theme';
// import {
//   createGenerateClassName,
//   createMuiTheme,
//   MuiThemeProvider,
// } from '@material-ui/core/styles';
//
// const defaultOptions = {
//   theme: {},
//   dangerouslyUseGlobalCSS: false,
//   productionPrefix: 'jss',
// };
//
// const sheetsRegistryMap = new Map();
//
// export const wrapPageElement = ({ element, props }) => {
//   return (
//     <Layout {...props}>{element}</Layout>
//   );
// };
//
// export const wrapRootElement = ({ element, pathname }, options) => {
//   const { dangerouslyUseGlobalCSS, productionPrefix } = {
//     ...defaultOptions,
//     ...options,
//   };
//
//   const generateClassName = createGenerateClassName({
//     dangerouslyUseGlobalCSS,
//     productionPrefix,
//   });
//
//   const sheetsRegistry = new SheetsRegistry();
//   sheetsRegistryMap.set(pathname, sheetsRegistry);
//
//   return (
//     <JssProvider
//       registry={sheetsRegistry}
//       generateClassName={generateClassName}
//     >
//       <MuiThemeProvider theme={createMuiTheme(theme)} sheetsManager={new Map()}>
//         <CssBaseline />
//         {element}
//       </MuiThemeProvider>
//     </JssProvider>
//   );
// };
//
// export const onRenderBody = ({ setHeadComponents, pathname }) => {
//   const sheetsRegistry = sheetsRegistryMap.get(pathname);
//
//   if (sheetsRegistry) {
//     setHeadComponents([
//       <style
//         id="server-side-jss"
//         key="server-side-jss"
//         dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }}
//       />,
//       <script
//         key="vk-retargeting"
//         type="text/javascript"
//         dangerouslySetInnerHTML={{
//           __html: `
//                 !function(){
//                 var t=document.createElement("script");
//                 t.type="text/javascript",
//                 t.async=!0,
//                 t.src="https://vk.com/js/api/openapi.js?168",
//                 t.onload=function(){
//                     VK.Retargeting.Init("VK-RTRG-493440-aoKed"),
//                     VK.Retargeting.Hit()
//                     }, document.head.appendChild(t)}();
//                 `
//         }}/>,
//       <script key="talk-me" type='text/javascript'
//               dangerouslySetInnerHTML={{
//                 __html: `
//                    (function(d, w, m) {
//                     window.supportAPIMethod = m;
//                     var s = d.createElement('script');
//                     s.type ='text/javascript'; s.id = 'supportScript'; s.charset = 'utf-8';
//                     s.async = true;
//                     var id = '226d519661c50fd5e16477daf16d89eb';
//                     s.src = 'https://lcab.talk-me.ru/support/support.js?h='+id;
//                     var sc = d.getElementsByTagName('script')[0];
//                     w[m] = w[m] || function() { (w[m].q = w[m].q || []).push(arguments); };
//                     if (sc) sc.parentNode.insertBefore(s, sc);
//                     else d.documentElement.firstChild.appendChild(s);
//                   })(document, window, 'TalkMe');
//                 `
//               }}
//       />
//     ]);
//
//     sheetsRegistryMap.delete(pathname);
//   }
// }

// =========================================================
// import React from 'react'
// import Layout from './src/components/layout'
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { ThemeProvider } from '@material-ui/styles';
// import theme from './src/theme';
//
// export const wrapRootElement = ({ element }) => {
//  return (
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     {element}
//   </ThemeProvider>
//  );
// };
//
//
//
// export const wrapPageElement = ({ element, props }) => {
//  return (
//     <Layout {...props}>{element}</Layout>
//  );
// };
//
//
// export const onRenderBody = ({ setHeadComponents }) => {
//       setHeadComponents([
//         <script
//             key={1}
//             type="text/javascript"
//             dangerouslySetInnerHTML={{
//                 __html: `
//                 !function(){
//                 var t=document.createElement("script");
//                 t.type="text/javascript",
//                 t.async=!0,
//                 t.src="https://vk.com/js/api/openapi.js?168",
//                 t.onload=function(){
//                     VK.Retargeting.Init("VK-RTRG-493440-aoKed"),
//                     VK.Retargeting.Hit()
//                     }, document.head.appendChild(t)}();
//                 `
//             }}/>,
//             <script key={2} type='text/javascript'
//               dangerouslySetInnerHTML={{
//                 __html: `
//                    (function(d, w, m) {
//                     window.supportAPIMethod = m;
//                     var s = d.createElement('script');
//                     s.type ='text/javascript'; s.id = 'supportScript'; s.charset = 'utf-8';
//                     s.async = true;
//                     var id = '226d519661c50fd5e16477daf16d89eb';
//                     s.src = 'https://lcab.talk-me.ru/support/support.js?h='+id;
//                     var sc = d.getElementsByTagName('script')[0];
//                     w[m] = w[m] || function() { (w[m].q = w[m].q || []).push(arguments); };
//                     if (sc) sc.parentNode.insertBefore(s, sc);
//                     else d.documentElement.firstChild.appendChild(s);
//                   })(document, window, 'TalkMe');
//                 `
//             }}
//           />
//       ])
// };
//
//