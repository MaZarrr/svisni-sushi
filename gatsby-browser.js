// import {clockSale} from "./src/reducers/shopping-cart";
// const {clockSale} = require('./src/reducers/shopping-cart').default
const createStore  = require('./src/state/createStore').default
const { Provider } = require('react-redux');
const React = require('react');
const Layout = require('./src/components/layout').default
// const Spinner = require('./src/components/spinner/spinner').default


exports.wrapPageElement = ({element, props}) => {
    // console.log(props)
    return <Layout {...props}>{element}</Layout>
}

// connect(null, null)(exports.onClientEntry = () => {
//     console.log("We've started!")
// })


exports.wrapRootElement = ({element}) => {
    return (
        <Provider store={createStore}>
            {element}
        </Provider>
        )
    }
// exports.onInitialClientRender = async () => {
//     const  {dispatch} = createStore
//     const clock = await dispatch(clockSale)
//     console.log(clock)
// }
//     exports.onRouteUpdate = (props) => {
//     console.log(props)
//         Spinner()
//         console.log(props.loadPage("pizza").then(data => console.log(data)))
//         // console.log(props.getResourcesForPathname('sety'))s
//         // if(props.location.pathname === "/sety") return
//     }
//
// exports.onRouteUpdateDelayed = (props) => {
//     console.log(props)
// }
//
// exports.onPreRouteUpdate = () => {
//     console.log("onPreRouteUpdate")
//     Spinner()
// }

// var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
//
// exports.__esModule = true;
// exports.onRouteUpdate = exports.onRouteUpdateDelayed = exports.onClientEntry = void 0;
//
// var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
//
// var _nprogress = _interopRequireDefault(require("nprogress"));
//
// exports.onClientEntry = function (a, pluginOptions) {
//     var onClientEntry = function onClientEntry(a, pluginOptions) {
//         if (pluginOptions === void 0) {
//             pluginOptions = {};
//         }
//
//         var options = (0, _extends2.default)({}, defaultOptions, pluginOptions); // Inject styles.
//
//         var styles = "\n    #nprogress {\n     pointer-events: none;\n    }\n    #nprogress .bar {\n      background: " + options.color + ";\n      position: fixed;\n      z-index: 1031;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 2px;\n    }\n    #nprogress .peg {\n      display: block;\n      position: absolute;\n      right: 0px;\n      width: 100px;\n      height: 100%;\n      box-shadow: 0 0 10px " + options.color + ", 0 0 5px " + options.color + ";\n      opacity: 1.0;\n      -webkit-transform: rotate(3deg) translate(0px, -4px);\n      -ms-transform: rotate(3deg) translate(0px, -4px);\n      transform: rotate(3deg) translate(0px, -4px);\n    }\n    #nprogress .spinner {\n      display: block;\n      position: fixed;\n      z-index: 1031;\n      top: 15px;\n      right: 15px;\n    }\n    #nprogress .spinner-icon {\n      width: 18px;\n      height: 18px;\n      box-sizing: border-box;\n      border: solid 2px transparent;\n      border-top-color: " + options.color + ";\n      border-left-color: " + options.color + ";\n      border-radius: 50%;\n      -webkit-animation: nprogress-spinner 400ms linear infinite;\n      animation: nprogress-spinner 400ms linear infinite;\n    }\n    .nprogress-custom-parent {\n      overflow: hidden;\n      position: relative;\n    }\n    .nprogress-custom-parent #nprogress .spinner,\n    .nprogress-custom-parent #nprogress .bar {\n      position: absolute;\n    }\n    @-webkit-keyframes nprogress-spinner {\n      0% {\n        -webkit-transform: rotate(0deg);\n      }\n      100% {\n        -webkit-transform: rotate(360deg);\n      }\n    }\n    @keyframes nprogress-spinner {\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  ";
//         var node = document.createElement("style");
//         node.id = "nprogress-styles";
//         node.innerHTML = styles;
//         _nprogress.default.configure(options);
//     };
//         exports.onClientEntry = onClientEntry;
//
//             var onRouteUpdateDelayed = function onRouteUpdateDelayed() {
//             _nprogress.default.start();
//         };
//
//             exports.onRouteUpdateDelayed = onRouteUpdateDelayed;
//
//                 var onRouteUpdate = function onRouteUpdate() {
//                 _nprogress.default.done();
//             };
//
//             exports.onRouteUpdate = onRouteUpdate;

// exports.onServiceWorkerUpdateReady = () => {
//     // const answer = window.confirm(
//     //     `This application has been updated. ` +
//     //     `Reload to display the latest version?`
//     // )
//     // if (answer === true) {
//     window.location.reload()
//     // }
// }

// exports.onServiceWorkerRedundant = ({serviceWorker }) => {
//  serviceWorker
// }
// exports.registerServiceWorker = () => true
// exports.onServiceWorkerRedundant = () => true

// exports.onServiceWorkerRedundant = (props) => {
//     console.log(props);
    
// }


// exports.onServiceWorkerActive = ({
//     getResourceURLsForPathname,
//     serviceWorker,
// }) => {
//     // if the SW has just updated then clear the path dependencies and don't cache
//     // stuff, since we're on the old revision until we navigate to another page
//     if (window.___swUpdated) {
//         serviceWorker.active.postMessage({
//             gatsbyApi: `clearPathResources`
//         })
//         return
//     }

//     // grab nodes from head of document
//     const nodes = document.querySelectorAll(`
//     head > script[src],
//     head > link[href],
//     head > style[data-href]
//   `)

//     // get all resource URLs
//     const headerResources = [].slice
//         .call(nodes)
//         // don't include preconnect/prefetch/prerender resources
//         .filter(
//             node =>
//             node.tagName !== `LINK` 
//             // || whiteListLinkRels.test(node.getAttribute(`rel`))
//         )
//         .map(node => node.src || node.href || node.getAttribute(`data-href`))

//     // Loop over prefetched pages and add their resources to an array,
//     // plus specify which resources are required for those paths.
//     const prefetchedResources = []
//     // prefetchedPathnames.forEach(path => {
//     //     const resources = getResourceURLsForPathname(path)
//     //     prefetchedResources.push(...resources)

//     //     serviceWorker.active.postMessage({
//     //         gatsbyApi: `setPathResources`,
//     //         path,
//     //         resources,
//     //     })
//     // })

//     // Loop over all resources and fetch the page component + JSON data
//     // to add it to the SW cache.
//     const resources = [...headerResources, ...prefetchedResources]
//     resources.forEach(resource => {
//         // Create a prefetch link for each resource, so Workbox runtime-caches them
//         const link = document.createElement(`link`)
//         link.rel = `prefetch`
//         link.href = resource

//         link.onload = link.remove
//         link.onerror = link.remove

//         document.head.appendChild(link)
//     })
// }



