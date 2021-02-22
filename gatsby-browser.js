const createStore = require('./src/state/createStore').default;
const { Provider } = require('react-redux');
const React = require('react');
// import { ThemeProvider } from '';
// import theme from '../../src/theme';
const { ThemeProvider } = require('@material-ui/core/styles');
const theme = require('./src/theme');
const Layout = require('./src/components/layout').default;

// exports.registerServiceWorker = () => true

exports.wrapPageElement = ({element, props}) => {
    return <Layout {...props}>{element}</Layout>
};

exports.wrapRootElement = ({element}) => {
    return (
        <Provider store={createStore}>
        <ThemeProvider theme={theme}>
            {element}
        </ThemeProvider>
        </Provider>
        )
    };


exports.onServiceWorkerUpdateReady = () => {
  if (
    window.confirm(
      "Cайт был обновлен. Вы хотите перезагрузить сайт, чтобы получить новые товары?"
    )
  ) {
    window.location.reload(true);
  }
};
