const createStore  = require('./src/state/createStore').default;
const { Provider } = require('react-redux');
const React = require('react');
const Layout = require('./src/components/layout').default;

exports.wrapPageElement = ({element, props}) => {
    return <Layout {...props}>{element}</Layout>
};

exports.wrapRootElement = ({element}) => {
    return (
        <Provider store={createStore}>
            {element}
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


// export const onServiceWorkerUpdateReady = async (args) => {
//   const permissionResponse = await Notification.requestPermission()
//   console.log(permissionResponse)
//   if (permissionResponse === "granted") {
//     await args.serviceWorker.showNotification("Website update", {
//       body:
//         "Our website just got a little bit better. We reloaded the site with the update to ensure a smooth experience for you."
//     })
//   }
//   window.location.reload(true)
// }

// Этот сайт был обновлен с новыми данными. Вы хотите перезагрузить сайт, чтобы получить новые данные?

// exports.onServiceWorkerUpdateReady = () => window.location.reload(true);


