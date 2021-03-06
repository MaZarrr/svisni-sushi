import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './src/components/layout'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './src/theme';
// import "./src/preloader.scss"

export const wrapRootElement = ({ element }) => {
 return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {element}
  </ThemeProvider>
 );
};

export const wrapPageElement = ({ element, props }) => {
 return (
    <Layout {...props}>{element}</Layout>
 );
};

export const onServiceWorkerUpdateReady = () => {
  if (
    window.confirm(
      "Cайт был обновлен. Вы хотите перезагрузить сайт, чтобы получить новые товары?"
    )
  ) {
    window.location.reload(true);
  }
};

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    console.log("rendering!");
    ReactDOM.render(element, container, callback);
  };
};
