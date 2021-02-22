// const createStore = require('./src/state/createStore').default;
// const { Provider } = require('react-redux');
// const Layout = require('./src/components/layout').default;
import React from 'react'
import Layout from './src/components/layout'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './src/theme';



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



// exports.registerServiceWorker = () => true

// exports.wrapPageElement = ({element, props}) => {
//     return <Layout {...props}>{element}</Layout>
// };

// exports.wrapRootElement = ({ element }) => {
//     return (
//         <Provider store={createStore}>
//             {element}
//         </Provider>
//         )
//     };


// exports.onServiceWorkerUpdateReady = () => {
  // if (
  //   window.confirm(
  //     "Cайт был обновлен. Вы хотите перезагрузить сайт, чтобы получить новые товары?"
  //   )
  // ) {
  //   window.location.reload(true);
  // }
// };
