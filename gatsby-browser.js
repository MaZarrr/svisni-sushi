
// import wrapWithProvider from "./wrap-with-provider"
// const ErrorBoundary = require('./src/components/error-boundary/error-boundary'); 
const createStore  = require('./src/state/createStore').default
const { Provider } = require('react-redux'); 
const React = require('react');
const Layout = require('./src/components/layout').default

exports.wrapPageElement = ({element, props}) => {
    return <Layout {...props}>{element}</Layout>
}

exports.wrapRootElement = ({element}) => {
    return (
        <Provider store={createStore}>
            {element}
        </Provider>
        )
    }

// exports.registerServiceWorker = () => true
// exports.onServiceWorkerRedundant = () => true

// exports.onServiceWorkerRedundant = (props) => {
//     console.log(props);
    
// }


exports.onServiceWorkerActive = ({
    getResourceURLsForPathname,
    serviceWorker,
}) => {
    // if the SW has just updated then clear the path dependencies and don't cache
    // stuff, since we're on the old revision until we navigate to another page
    if (window.___swUpdated) {
        serviceWorker.active.postMessage({
            gatsbyApi: `clearPathResources`
        })
        return
    }

    // grab nodes from head of document
    const nodes = document.querySelectorAll(`
    head > script[src],
    head > link[href],
    head > style[data-href]
  `)

    // get all resource URLs
    const headerResources = [].slice
        .call(nodes)
        // don't include preconnect/prefetch/prerender resources
        .filter(
            node =>
            node.tagName !== `LINK` 
            // || whiteListLinkRels.test(node.getAttribute(`rel`))
        )
        .map(node => node.src || node.href || node.getAttribute(`data-href`))

    // Loop over prefetched pages and add their resources to an array,
    // plus specify which resources are required for those paths.
    const prefetchedResources = []
    // prefetchedPathnames.forEach(path => {
    //     const resources = getResourceURLsForPathname(path)
    //     prefetchedResources.push(...resources)

    //     serviceWorker.active.postMessage({
    //         gatsbyApi: `setPathResources`,
    //         path,
    //         resources,
    //     })
    // })

    // Loop over all resources and fetch the page component + JSON data
    // to add it to the SW cache.
    const resources = [...headerResources, ...prefetchedResources]
    resources.forEach(resource => {
        // Create a prefetch link for each resource, so Workbox runtime-caches them
        const link = document.createElement(`link`)
        link.rel = `prefetch`
        link.href = resource

        link.onload = link.remove
        link.onerror = link.remove

        document.head.appendChild(link)
    })
}


exports.onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
        `This application has been updated. ` +
        `Reload to display the latest version?`
    )
    if (answer === true) {
        window.location.reload()
    }
}

